// -------------------------------------- Initialize redis + config --------------------------------------
// import { promisify } from 'util'
import { RedisClientOptions, createClient } from "redis";
import config from "../configs";

const redisConfigs = config.redis;
const url = `redis://${
  redisConfigs.password ? `:${redisConfigs.password}@` : ""
}${redisConfigs.host}:${redisConfigs.post}`;
const options: RedisClientOptions = { url };
if (redisConfigs.password) options.password = redisConfigs.password;
const client = createClient(options);

// const getAsync = promisify(client.get).bind(client)

client.on("error", (err: any) => {
  console.log(`>>>> Redis Error: ${err}`);
});
console.log(`<<<< Connected to Redis >>>>`);

// -------------------------------------- Redis Functions --------------------------------------
// function set(key: string, value: any): Promise<boolean> {
//   return Promise.resolve( client.set(key, JSON.stringify(value)) )
// }

// async function get(keyPattern: string): Promise<any> {
//   try {
//     const result = await getAsync(keyPattern)
//     console.log('>>>>>>>> getAsync result: ', result)
//     if(!result) return false
//     return JSON.parse(result)
//   }
//   catch (err) {
//     console.log('Redis Error - Fetch Data: ', err)
//     throw err
//   }
// }

// const exportResult = { set, get }

// export default exportResult

export default client;
