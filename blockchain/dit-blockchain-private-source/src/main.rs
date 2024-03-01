use dit_actual_ballots_service;
use exonum_cli::{NodeBuilder, Spec};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    exonum::crypto::init();
    exonum::helpers::init_logger().unwrap();

    println!("Starting DIT private node");

    NodeBuilder::new()
        .with(Spec::new(dit_actual_ballots_service::ActualBallotsService).with_default_instance())
        .run()
        .await
}
