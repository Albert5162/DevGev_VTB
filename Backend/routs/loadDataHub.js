const Router = require('@koa/router');
const axios = require("axios")
const router = new Router();
const { gql } = require('graphql-request')
const query = gql`
    query getBrowseResults($input: BrowseInput!) {
  browse(input: $input) {
    entities {
      urn
      type
      ... on Dataset {
        name
        origin
         schemaMetadata(version: 0) {
          name
          fields {
            fieldPath
            type
          }
          foreignKeys {
            foreignDataset{
              urn
            }
            foreignFields {
              fieldPath
            }
          }
        }
        description
      }
    }
    groups {
      name
      count
      __typename
    }
  }
}

  `

router.post('/parse_dataHub', async ctx => {
    let datasets = []
    const {url, username, password} = ctx.request.body
    let res = await axios.post(url + "/logIn", {
        password,
        username
    })
    const input = {
        "type": "DATASET",
        "filters": null
    }
    const ac_coockie = res.headers["set-cookie"]
    async function getDatasetOnPath(path) {
        let data = await axios.post(url + "/api/graphql",
            {
                query,
                variables: {
                    input: {...input, path}
                }
            },
            {
                headers: {
                    "Cookie": ac_coockie.join(";")
                }
            }
        )
        let groups = data.data?.data?.browse?.groups
        let arr_datasets = data.data?.data?.browse?.entities
        if (arr_datasets.length) {
            arr_datasets.forEach(ds => {
                datasets.push({...ds, path: path.join("."), user_id: ctx.state.user._id, active: 1})
            })
        }
        if (groups.length) {
            for (let val of groups) {
                await getDatasetOnPath([...path, val.name])
            }
        }
    }
    await getDatasetOnPath([])
    // console.log(datasets[0].schemaMetadata.fields)
    await dbProvider.meta_datasets.addInfo(datasets)
    ctx.body = datasets
});

module.exports = router
