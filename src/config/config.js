const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

// Configure dotenv to load environment variables from a specific path
dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    WEB_CLIENT_URL: Joi.string().required().description('frontend web url'),
    CORS_WHITELIST: Joi.string().default('*').description('Cors whitelist'),
  })
  .unknown(); // Allow unknown keys in environment variables

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
    //   useCreateIndex: true,
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    },
  },
  frontendUrl: {
    web: envVars.WEB_CLIENT_URL,
  },
  cors: {
    whitelist: envVars.CORS_WHITELIST.split(','),
  },
};