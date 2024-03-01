use exonum::runtime::{CommonError, ExecutionContext, ExecutionError, InstanceId};
use exonum_derive::{ServiceDispatcher, ServiceFactory};
use exonum_merkledb::BinaryValue;
use exonum_rust_runtime::{api::ServiceApiBuilder, DefaultInstance, Service};
use exonum_supervisor::Configure;

use crate::{
    api::{PrivateApi, PublicApi},
    proto,
    schema::{ServiceConfig, ServiceConfigSchema},
    transactions::ActualBallotsServiceInterface,
};

#[derive(Debug, ServiceDispatcher, ServiceFactory)]
#[service_dispatcher(implements(
    "ActualBallotsServiceInterface",
    raw = "Configure<Params = ServiceConfigSchema>"
))]
#[service_factory(artifact_name = "dit-actual-ballots-service", proto_sources = "proto")]
pub struct ActualBallotsService;

fn verify_config(
    _context: &ExecutionContext<'_>,
    _config: &ServiceConfigSchema,
) -> Result<(), ExecutionError> {
    // TODO: verify configuration
    Ok(())
}

impl Service for ActualBallotsService {
    fn initialize(
        &self,
        context: ExecutionContext<'_>,
        params: Vec<u8>,
    ) -> Result<(), ExecutionError> {
        let config = ServiceConfigSchema::from_bytes(params.into())
            .map_err(CommonError::malformed_arguments)?;

        ServiceConfig::instantiate(context.service_data())
            .config
            .set(config);
        Ok(())
    }

    fn wire_api(&self, builder: &mut ServiceApiBuilder) {
        PublicApi::wire(builder);
        PrivateApi::wire(builder);
    }
}

impl DefaultInstance for ActualBallotsService {
    const INSTANCE_ID: InstanceId = 1001;
    const INSTANCE_NAME: &'static str = "actual_ballots_service";
}

impl Configure for ActualBallotsService {
    type Params = ServiceConfigSchema;

    fn verify_config(
        &self,
        context: ExecutionContext<'_>,
        params: Self::Params,
    ) -> Result<(), ExecutionError> {
        verify_config(&context, &params)
    }

    fn apply_config(
        &self,
        context: ExecutionContext<'_>,
        params: Self::Params,
    ) -> Result<(), ExecutionError> {
        let mut service_config = ServiceConfig::instantiate(context.service_data());
        service_config.config.set(params);
        Ok(())
    }
}
