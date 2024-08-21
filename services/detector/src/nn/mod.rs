use candle_core::{Error, Tensor};

/// A reimplementation of the MaxPooling2D layer from Keras.
pub struct MaxPooling2D {
    pool_size: (usize, usize),
}

impl Default for MaxPooling2D {
    fn default() -> Self {
        Self { pool_size: (2, 2) }
    }
}

impl MaxPooling2D {
    pub fn new(pool_size: (usize, usize)) -> Self {
        Self { pool_size }
    }

    pub fn forward(&self, input: &Tensor) -> Result<Tensor, Error> {
        input.max_pool2d(self.pool_size)
    }
}

/// Flatten a tensor along a given dimension range.
pub struct Flatten {
    start: usize,
    end: usize,
}

impl Flatten {
    pub fn new(start_dim: usize, end_dim: usize) -> Self {
        Self {
            start: start_dim,
            end: end_dim,
        }
    }

    pub fn forward(&self, input: &Tensor) -> Result<Tensor, Error> {
        input.flatten(self.start, self.end)
    }
}
