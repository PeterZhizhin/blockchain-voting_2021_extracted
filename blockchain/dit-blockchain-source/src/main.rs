use exonum_cli::{NodeBuilder, Spec};
use dit_votings_service;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    exonum::crypto::init();
    exonum::helpers::init_logger().unwrap();

    println!("Starting DIT voting node");

    NodeBuilder::new()
        .with(Spec::new(dit_votings_service::VotingsService).with_default_instance())
        .run()
        .await
}
