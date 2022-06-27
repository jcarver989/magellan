import { AwsGlueClient } from './AwsGlueClient'
import { MetastoreClient } from './MetastoreClient'

enum MetastoreClientName {
  GLUE = 'aws-glue'
}

/** This acts as a "registry lookup" that allows users to specify pluggable metastore clients via an env variable.
 *  AWS Glue Data Catalog is the default.
 *
 *  To add your own:
 *  1. Write a class for your metastore that implements the MetastoreClient interface
 *  2. Add an env variable value for your metastore to the MetastoreClientName enum above
 *  3. Add your new enum value from #2 to this switch statement and instantiate your class from #1
 *  4. Pass the appropriate env variable in
 *  5. Open a PR if you think other people would benefit from your metastore client implementation
 */
export function getMetastoreClientFromEnv(): MetastoreClient {
  switch (process.env.METASTORE_CLIENT) {
    case MetastoreClientName.GLUE:
    case undefined: {
      return new AwsGlueClient()
    }

    default: {
      throw new Error(
        `process.env.METASTORE_CLIENT is set to: ${process.env.METASTORE_CLIENT}, which is not a supported metastore client name`
      )
    }
  }
}
