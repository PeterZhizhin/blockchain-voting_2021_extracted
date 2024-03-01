use exonum::runtime::{ExecutionContext, ExecutionError};
use exonum_derive::{exonum_interface, interface_method};

use crate::service::ActualBallotsService;

mod create_actual_ballots_storage;
mod resolve_group_ids;
mod store_actual_ballots;
mod store_grouped_tx_hash;
mod tally_results;

use create_actual_ballots_storage::TxCreateActualBallotsStorage;
use resolve_group_ids::TxResolveGroupIds;
use store_actual_ballots::TxStoreActualBallots;
use store_grouped_tx_hash::TxStoreGroupedTxHash;
use tally_results::TxTallyResults;

#[exonum_interface]
pub trait ActualBallotsServiceInterface<Ctx> {
    type Output;

    #[interface_method(id = 0)]
    fn create_actual_ballots_storage(
        &self,
        ctx: Ctx,
        tx_args: TxCreateActualBallotsStorage,
    ) -> Self::Output;

    #[interface_method(id = 1)]
    fn store_grouped_tx_hash(&self, ctx: Ctx, tx_args: TxStoreGroupedTxHash) -> Self::Output;

    #[interface_method(id = 2)]
    fn resolve_group_ids(&self, ctx: Ctx, tx_args: TxResolveGroupIds) -> Self::Output;

    #[interface_method(id = 3)]
    fn store_actual_ballots(&self, ctx: Ctx, tx_args: TxStoreActualBallots) -> Self::Output;

    #[interface_method(id = 4)]
    fn tally_results(&self, ctx: Ctx, tx_args: TxTallyResults) -> Self::Output;
}

impl ActualBallotsServiceInterface<ExecutionContext<'_>> for ActualBallotsService {
    type Output = Result<(), ExecutionError>;

    fn create_actual_ballots_storage(
        &self,
        ctx: ExecutionContext<'_>,
        tx_args: TxCreateActualBallotsStorage,
    ) -> Self::Output {
        TxCreateActualBallotsStorage::execute(&self, ctx, tx_args)
    }

    fn store_grouped_tx_hash(
        &self,
        ctx: ExecutionContext<'_>,
        tx_args: TxStoreGroupedTxHash,
    ) -> Self::Output {
        TxStoreGroupedTxHash::execute(&self, ctx, tx_args)
    }

    fn resolve_group_ids(
        &self,
        ctx: ExecutionContext<'_>,
        tx_args: TxResolveGroupIds,
    ) -> Self::Output {
        TxResolveGroupIds::execute(&self, ctx, tx_args)
    }

    fn store_actual_ballots(
        &self,
        ctx: ExecutionContext<'_>,
        tx_args: TxStoreActualBallots,
    ) -> Self::Output {
        TxStoreActualBallots::execute(&self, ctx, tx_args)
    }

    fn tally_results(&self, ctx: ExecutionContext<'_>, tx_args: TxTallyResults) -> Self::Output {
        TxTallyResults::execute(&self, ctx, tx_args)
    }
}
