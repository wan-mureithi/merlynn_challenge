import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = process.env.REACT_APP_BASE_URL;
const token = process.env.REACT_APP_TOKEN;
const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        headers.set('Authorization', `Token ${token}`);
        return headers;
      }
});

//this functionality will help in storing data gotten from the models api and reusing it
export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        readModels: builder.query({
            query: () => ({
                url: '/models',
                method: 'GET'
            })
        }),
        getDecision: builder.mutation({
            query({body, modelId}) {
                return {
                    url: `/decision/${modelId}`,
                    method:'POST',
                    body
                }
            }
        }),
        readBatch: builder.query({
            query: (modelID) => ({
                url: `/batch/${modelID}`,
                method: 'GET'
            })
        }),
    })
})
export const {
    useReadModelsQuery,
    useReadBatchQuery,
    useGetDecisionMutation
} = apiSlice