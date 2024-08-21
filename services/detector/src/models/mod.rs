use candle_core::{DType, Result};
use candle_nn::{VarBuilder, VarMap};
use standard::Standard;

mod standard;

/// Construct a model suited for classifying the 3 categories of E6's explicity rating.
pub fn explicit() -> Result<Standard> {
    let varmap = VarMap::new();
    let vb = VarBuilder::from_varmap(&varmap, DType::F32, &candle_core::Device::Cpu);
    Standard::new(vb, 3)
}

/// Construct a model suited for classifying AI-generated content.
pub fn ai() -> Result<Standard> {
    let varmap = VarMap::new();
    let vb = VarBuilder::from_varmap(&varmap, DType::F32, &candle_core::Device::Cpu);
    Standard::new(vb, 3)
}
