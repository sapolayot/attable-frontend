const mode = process.env.API_MODE || 'production'
let config = {}

if (mode === 'localhost') {
    config = {
        ENDPOINT_URL: process.env.ENDPOINT_URL_LOCAL,
        ENDPOINT_URL_AUTHEN: process.env.ENDPOINT_URL_AUTHEN_LOCAL,
        ENDPOINT_ROOT: process.env.ENDPOINT_ROOT_LOCAL,
        ENDPOINT_UPLOAD_DATA: process.env.ENDPOINT_UPLOAD_DATA_LOCAL,
        ENDPOINT_MUTIPLE_UPLOAD_DATA:
            process.env.ENDPOINT_MUTIPLE_UPLOAD_DATA_LOCAL,
        ENDPOINT_GENERATE_QR_CODE_PHONE:
            process.env.ENDPOINT_GENERATE_QR_CODE_PHONE_LOCAL,
        ENDPOINT_OMISE: process.env.ENDPOINT_OMISE_LOCAL,
    }
} else if (mode === 'test-staging') {
    config = {
        ENDPOINT_URL: process.env.ENDPOINT_URL_TEST_STAGING,
        ENDPOINT_URL_AUTHEN: process.env.ENDPOINT_URL_AUTHEN_TEST_STAGING,
        ENDPOINT_ROOT: process.env.ENDPOINT_ROOT_TEST_STAGING,
        ENDPOINT_UPLOAD_DATA: process.env.ENDPOINT_UPLOAD_DATA_TEST_STAGING,
        ENDPOINT_MUTIPLE_UPLOAD_DATA:
            process.env.ENDPOINT_MUTIPLE_UPLOAD_DATA_TEST_STAGING,
        ENDPOINT_GENERATE_QR_CODE_PHONE:
            process.env.ENDPOINT_GENERATE_QR_CODE_PHONE_TEST_STAGING,
        ENDPOINT_OMISE: process.env.ENDPOINT_OMISE_TEST_STAGING,
    }
} else if (mode === 'staging') {
    config = {
        ENDPOINT_URL: process.env.ENDPOINT_URL_STAGING,
        ENDPOINT_URL_AUTHEN: process.env.ENDPOINT_URL_AUTHEN_STAGING,
        ENDPOINT_ROOT: process.env.ENDPOINT_ROOT_STAGING,
        ENDPOINT_UPLOAD_DATA: process.env.ENDPOINT_UPLOAD_DATA_STAGING,
        ENDPOINT_MUTIPLE_UPLOAD_DATA:
            process.env.ENDPOINT_MUTIPLE_UPLOAD_DATA_STAGING,
        ENDPOINT_GENERATE_QR_CODE_PHONE:
            process.env.ENDPOINT_GENERATE_QR_CODE_PHONE_STAGING,
        ENDPOINT_OMISE: process.env.ENDPOINT_OMISE_STAGING,
    }
} else if (mode === 'production') {
    config = {
        ENDPOINT_URL:
            process.env.ENDPOINT_URL_PRODUCTION ||
            'https://attable-backend-production.up.railway.app/graphql',
        ENDPOINT_URL_AUTHEN:
            process.env.ENDPOINT_URL_AUTHEN_PRODUCTION ||
            'https://attable-backend-production.up.railway.app/auth',
        ENDPOINT_ROOT:
            process.env.ENDPOINT_ROOT_PRODUCTION ||
            'https://attable-backend-production.up.railway.app',
        ENDPOINT_UPLOAD_DATA:
            process.env.ENDPOINT_UPLOAD_DATA_PRODUCTION ||
            'https://attable-backend-production.up.railway.app/upload',
        ENDPOINT_MUTIPLE_UPLOAD_DATA:
            process.env.ENDPOINT_MUTIPLE_UPLOAD_DATA_PRODUCTION ||
            'https://attable-backend-production.up.railway.app/uploadMultiple',
        ENDPOINT_GENERATE_QR_CODE_PHONE:
            process.env.ENDPOINT_GENERATE_QR_CODE_PRODUCTION,
        ENDPOINT_OMISE: process.env.ENDPOINT_OMISE_PRODUCTION,
    }
}

export default config
