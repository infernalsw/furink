use candle_core::{Result, Tensor};
use candle_nn::{ops::softmax, Conv2d, Conv2dConfig, Linear, Module, VarBuilder};

pub struct Standard {
    categories: usize,
    conv1: Conv2d,
    conv2: Conv2d,
    conv3: Conv2d,
    ln1: Linear,
    ln2: Linear,
}

impl Standard {
    pub fn new(vb: VarBuilder, categories: usize) -> Result<Self> {
        Ok(Self {
            categories,
            conv1: candle_nn::conv2d(3, 3, 3, Conv2dConfig::default(), vb.pp("conv1"))?,
            conv2: candle_nn::conv2d(3, 3, 3, Conv2dConfig::default(), vb.pp("conv2"))?,
            conv3: candle_nn::conv2d(3, 3, 3, Conv2dConfig::default(), vb.pp("conv3"))?,
            ln1: candle_nn::linear(2700, 128, vb.pp("ln1"))?,
            ln2: candle_nn::linear(128, categories, vb.pp("ln2"))?,
        })
    }
}

impl Module for Standard {
    fn forward(&self, xs: &Tensor) -> Result<Tensor> {
        self.conv1
            .forward(&xs)
            .and_then(|xs| xs.max_pool2d((2, 2)))
            .and_then(|xs| self.conv2.forward(&xs))
            .and_then(|xs| xs.max_pool2d((2, 2)))
            .and_then(|xs| self.conv3.forward(&xs))
            .and_then(|xs| xs.max_pool2d((2, 2)))
            .and_then(|xs| xs.flatten(1, 3))
            .and_then(|xs| self.ln1.forward(&xs))
            .and_then(|xs| self.ln2.forward(&xs))
            .and_then(|xs| xs.reshape(self.categories))
            .and_then(|xs| softmax(&xs, 0))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use candle_core::{DType, Tensor};
    use candle_nn::VarMap;

    #[test]
    fn test_standard() {
        let varmap = VarMap::new();
        let vb = VarBuilder::from_varmap(&varmap, DType::F64, &candle_core::Device::Cpu);
        let model = Standard::new(vb, 3).unwrap();
        let tensor = Tensor::rand(0.0, 1.0, (1, 3, 256, 256), &candle_core::Device::Cpu).unwrap();
        println!("{}", model.forward(&tensor).unwrap());
    }
}
