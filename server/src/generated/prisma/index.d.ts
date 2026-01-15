
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Trip
 * 
 */
export type Trip = $Result.DefaultSelection<Prisma.$TripPayload>
/**
 * Model Collaborator
 * 
 */
export type Collaborator = $Result.DefaultSelection<Prisma.$CollaboratorPayload>
/**
 * Model ItineraryItem
 * 
 */
export type ItineraryItem = $Result.DefaultSelection<Prisma.$ItineraryItemPayload>
/**
 * Model LocationCache
 * 
 */
export type LocationCache = $Result.DefaultSelection<Prisma.$LocationCachePayload>
/**
 * Model Hotel
 * 
 */
export type Hotel = $Result.DefaultSelection<Prisma.$HotelPayload>
/**
 * Model TripMessage
 * 
 */
export type TripMessage = $Result.DefaultSelection<Prisma.$TripMessagePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trip`: Exposes CRUD operations for the **Trip** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trips
    * const trips = await prisma.trip.findMany()
    * ```
    */
  get trip(): Prisma.TripDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.collaborator`: Exposes CRUD operations for the **Collaborator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Collaborators
    * const collaborators = await prisma.collaborator.findMany()
    * ```
    */
  get collaborator(): Prisma.CollaboratorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itineraryItem`: Exposes CRUD operations for the **ItineraryItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItineraryItems
    * const itineraryItems = await prisma.itineraryItem.findMany()
    * ```
    */
  get itineraryItem(): Prisma.ItineraryItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.locationCache`: Exposes CRUD operations for the **LocationCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LocationCaches
    * const locationCaches = await prisma.locationCache.findMany()
    * ```
    */
  get locationCache(): Prisma.LocationCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hotel`: Exposes CRUD operations for the **Hotel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Hotels
    * const hotels = await prisma.hotel.findMany()
    * ```
    */
  get hotel(): Prisma.HotelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tripMessage`: Exposes CRUD operations for the **TripMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TripMessages
    * const tripMessages = await prisma.tripMessage.findMany()
    * ```
    */
  get tripMessage(): Prisma.TripMessageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Trip: 'Trip',
    Collaborator: 'Collaborator',
    ItineraryItem: 'ItineraryItem',
    LocationCache: 'LocationCache',
    Hotel: 'Hotel',
    TripMessage: 'TripMessage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "trip" | "collaborator" | "itineraryItem" | "locationCache" | "hotel" | "tripMessage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Trip: {
        payload: Prisma.$TripPayload<ExtArgs>
        fields: Prisma.TripFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TripFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TripFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          findFirst: {
            args: Prisma.TripFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TripFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          findMany: {
            args: Prisma.TripFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>[]
          }
          create: {
            args: Prisma.TripCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          createMany: {
            args: Prisma.TripCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TripCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>[]
          }
          delete: {
            args: Prisma.TripDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          update: {
            args: Prisma.TripUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          deleteMany: {
            args: Prisma.TripDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TripUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TripUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>[]
          }
          upsert: {
            args: Prisma.TripUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripPayload>
          }
          aggregate: {
            args: Prisma.TripAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrip>
          }
          groupBy: {
            args: Prisma.TripGroupByArgs<ExtArgs>
            result: $Utils.Optional<TripGroupByOutputType>[]
          }
          count: {
            args: Prisma.TripCountArgs<ExtArgs>
            result: $Utils.Optional<TripCountAggregateOutputType> | number
          }
        }
      }
      Collaborator: {
        payload: Prisma.$CollaboratorPayload<ExtArgs>
        fields: Prisma.CollaboratorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CollaboratorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CollaboratorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>
          }
          findFirst: {
            args: Prisma.CollaboratorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CollaboratorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>
          }
          findMany: {
            args: Prisma.CollaboratorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>[]
          }
          create: {
            args: Prisma.CollaboratorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>
          }
          createMany: {
            args: Prisma.CollaboratorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CollaboratorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>[]
          }
          delete: {
            args: Prisma.CollaboratorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>
          }
          update: {
            args: Prisma.CollaboratorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>
          }
          deleteMany: {
            args: Prisma.CollaboratorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CollaboratorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CollaboratorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>[]
          }
          upsert: {
            args: Prisma.CollaboratorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>
          }
          aggregate: {
            args: Prisma.CollaboratorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCollaborator>
          }
          groupBy: {
            args: Prisma.CollaboratorGroupByArgs<ExtArgs>
            result: $Utils.Optional<CollaboratorGroupByOutputType>[]
          }
          count: {
            args: Prisma.CollaboratorCountArgs<ExtArgs>
            result: $Utils.Optional<CollaboratorCountAggregateOutputType> | number
          }
        }
      }
      ItineraryItem: {
        payload: Prisma.$ItineraryItemPayload<ExtArgs>
        fields: Prisma.ItineraryItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItineraryItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItineraryItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>
          }
          findFirst: {
            args: Prisma.ItineraryItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItineraryItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>
          }
          findMany: {
            args: Prisma.ItineraryItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>[]
          }
          create: {
            args: Prisma.ItineraryItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>
          }
          createMany: {
            args: Prisma.ItineraryItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItineraryItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>[]
          }
          delete: {
            args: Prisma.ItineraryItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>
          }
          update: {
            args: Prisma.ItineraryItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>
          }
          deleteMany: {
            args: Prisma.ItineraryItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItineraryItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItineraryItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>[]
          }
          upsert: {
            args: Prisma.ItineraryItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItineraryItemPayload>
          }
          aggregate: {
            args: Prisma.ItineraryItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItineraryItem>
          }
          groupBy: {
            args: Prisma.ItineraryItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItineraryItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItineraryItemCountArgs<ExtArgs>
            result: $Utils.Optional<ItineraryItemCountAggregateOutputType> | number
          }
        }
      }
      LocationCache: {
        payload: Prisma.$LocationCachePayload<ExtArgs>
        fields: Prisma.LocationCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationCachePayload>
          }
          findFirst: {
            args: Prisma.LocationCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationCachePayload>
          }
          findMany: {
            args: Prisma.LocationCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationCachePayload>[]
          }
          create: {
            args: Prisma.LocationCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationCachePayload>
          }
          createMany: {
            args: Prisma.LocationCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationCachePayload>[]
          }
          delete: {
            args: Prisma.LocationCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationCachePayload>
          }
          update: {
            args: Prisma.LocationCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationCachePayload>
          }
          deleteMany: {
            args: Prisma.LocationCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationCachePayload>[]
          }
          upsert: {
            args: Prisma.LocationCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationCachePayload>
          }
          aggregate: {
            args: Prisma.LocationCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocationCache>
          }
          groupBy: {
            args: Prisma.LocationCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCacheCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCacheCountAggregateOutputType> | number
          }
        }
      }
      Hotel: {
        payload: Prisma.$HotelPayload<ExtArgs>
        fields: Prisma.HotelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HotelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HotelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelPayload>
          }
          findFirst: {
            args: Prisma.HotelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HotelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelPayload>
          }
          findMany: {
            args: Prisma.HotelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelPayload>[]
          }
          create: {
            args: Prisma.HotelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelPayload>
          }
          createMany: {
            args: Prisma.HotelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HotelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelPayload>[]
          }
          delete: {
            args: Prisma.HotelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelPayload>
          }
          update: {
            args: Prisma.HotelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelPayload>
          }
          deleteMany: {
            args: Prisma.HotelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HotelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HotelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelPayload>[]
          }
          upsert: {
            args: Prisma.HotelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HotelPayload>
          }
          aggregate: {
            args: Prisma.HotelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHotel>
          }
          groupBy: {
            args: Prisma.HotelGroupByArgs<ExtArgs>
            result: $Utils.Optional<HotelGroupByOutputType>[]
          }
          count: {
            args: Prisma.HotelCountArgs<ExtArgs>
            result: $Utils.Optional<HotelCountAggregateOutputType> | number
          }
        }
      }
      TripMessage: {
        payload: Prisma.$TripMessagePayload<ExtArgs>
        fields: Prisma.TripMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TripMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TripMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripMessagePayload>
          }
          findFirst: {
            args: Prisma.TripMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TripMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripMessagePayload>
          }
          findMany: {
            args: Prisma.TripMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripMessagePayload>[]
          }
          create: {
            args: Prisma.TripMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripMessagePayload>
          }
          createMany: {
            args: Prisma.TripMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TripMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripMessagePayload>[]
          }
          delete: {
            args: Prisma.TripMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripMessagePayload>
          }
          update: {
            args: Prisma.TripMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripMessagePayload>
          }
          deleteMany: {
            args: Prisma.TripMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TripMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TripMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripMessagePayload>[]
          }
          upsert: {
            args: Prisma.TripMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TripMessagePayload>
          }
          aggregate: {
            args: Prisma.TripMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTripMessage>
          }
          groupBy: {
            args: Prisma.TripMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<TripMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.TripMessageCountArgs<ExtArgs>
            result: $Utils.Optional<TripMessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    trip?: TripOmit
    collaborator?: CollaboratorOmit
    itineraryItem?: ItineraryItemOmit
    locationCache?: LocationCacheOmit
    hotel?: HotelOmit
    tripMessage?: TripMessageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    trips: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trips?: boolean | UserCountOutputTypeCountTripsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTripsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollaboratorWhereInput
  }


  /**
   * Count Type TripCountOutputType
   */

  export type TripCountOutputType = {
    collaborators: number
    items: number
    hotels: number
    messages: number
  }

  export type TripCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collaborators?: boolean | TripCountOutputTypeCountCollaboratorsArgs
    items?: boolean | TripCountOutputTypeCountItemsArgs
    hotels?: boolean | TripCountOutputTypeCountHotelsArgs
    messages?: boolean | TripCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripCountOutputType
     */
    select?: TripCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeCountCollaboratorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollaboratorWhereInput
  }

  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItineraryItemWhereInput
  }

  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeCountHotelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HotelWhereInput
  }

  /**
   * TripCountOutputType without action
   */
  export type TripCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TripMessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    travelStyle: string | null
    pace: string | null
    budgetRange: string | null
    currency: string | null
    distanceUnit: string | null
    theme: string | null
    emailAlerts: boolean | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    travelStyle: string | null
    pace: string | null
    budgetRange: string | null
    currency: string | null
    distanceUnit: string | null
    theme: string | null
    emailAlerts: boolean | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    travelStyle: number
    pace: number
    budgetRange: number
    currency: number
    distanceUnit: number
    theme: number
    emailAlerts: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    travelStyle?: true
    pace?: true
    budgetRange?: true
    currency?: true
    distanceUnit?: true
    theme?: true
    emailAlerts?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    travelStyle?: true
    pace?: true
    budgetRange?: true
    currency?: true
    distanceUnit?: true
    theme?: true
    emailAlerts?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    travelStyle?: true
    pace?: true
    budgetRange?: true
    currency?: true
    distanceUnit?: true
    theme?: true
    emailAlerts?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    travelStyle: string
    pace: string
    budgetRange: string
    currency: string
    distanceUnit: string
    theme: string
    emailAlerts: boolean
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    travelStyle?: boolean
    pace?: boolean
    budgetRange?: boolean
    currency?: boolean
    distanceUnit?: boolean
    theme?: boolean
    emailAlerts?: boolean
    createdAt?: boolean
    trips?: boolean | User$tripsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    travelStyle?: boolean
    pace?: boolean
    budgetRange?: boolean
    currency?: boolean
    distanceUnit?: boolean
    theme?: boolean
    emailAlerts?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    travelStyle?: boolean
    pace?: boolean
    budgetRange?: boolean
    currency?: boolean
    distanceUnit?: boolean
    theme?: boolean
    emailAlerts?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    travelStyle?: boolean
    pace?: boolean
    budgetRange?: boolean
    currency?: boolean
    distanceUnit?: boolean
    theme?: boolean
    emailAlerts?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "travelStyle" | "pace" | "budgetRange" | "currency" | "distanceUnit" | "theme" | "emailAlerts" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trips?: boolean | User$tripsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      trips: Prisma.$CollaboratorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      travelStyle: string
      pace: string
      budgetRange: string
      currency: string
      distanceUnit: string
      theme: string
      emailAlerts: boolean
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trips<T extends User$tripsArgs<ExtArgs> = {}>(args?: Subset<T, User$tripsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly travelStyle: FieldRef<"User", 'String'>
    readonly pace: FieldRef<"User", 'String'>
    readonly budgetRange: FieldRef<"User", 'String'>
    readonly currency: FieldRef<"User", 'String'>
    readonly distanceUnit: FieldRef<"User", 'String'>
    readonly theme: FieldRef<"User", 'String'>
    readonly emailAlerts: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.trips
   */
  export type User$tripsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    where?: CollaboratorWhereInput
    orderBy?: CollaboratorOrderByWithRelationInput | CollaboratorOrderByWithRelationInput[]
    cursor?: CollaboratorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CollaboratorScalarFieldEnum | CollaboratorScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Trip
   */

  export type AggregateTrip = {
    _count: TripCountAggregateOutputType | null
    _avg: TripAvgAggregateOutputType | null
    _sum: TripSumAggregateOutputType | null
    _min: TripMinAggregateOutputType | null
    _max: TripMaxAggregateOutputType | null
  }

  export type TripAvgAggregateOutputType = {
    travelers: number | null
    estimatedTravelHours: number | null
  }

  export type TripSumAggregateOutputType = {
    travelers: number | null
    estimatedTravelHours: number | null
  }

  export type TripMinAggregateOutputType = {
    id: string | null
    name: string | null
    destination: string | null
    startDate: Date | null
    endDate: Date | null
    travelers: number | null
    originCity: string | null
    transportMode: string | null
    estimatedTravelHours: number | null
    createdAt: Date | null
    shareToken: string | null
    tripCode: string | null
  }

  export type TripMaxAggregateOutputType = {
    id: string | null
    name: string | null
    destination: string | null
    startDate: Date | null
    endDate: Date | null
    travelers: number | null
    originCity: string | null
    transportMode: string | null
    estimatedTravelHours: number | null
    createdAt: Date | null
    shareToken: string | null
    tripCode: string | null
  }

  export type TripCountAggregateOutputType = {
    id: number
    name: number
    destination: number
    startDate: number
    endDate: number
    travelers: number
    originCity: number
    transportMode: number
    estimatedTravelHours: number
    createdAt: number
    shareToken: number
    tripCode: number
    dailySummaries: number
    _all: number
  }


  export type TripAvgAggregateInputType = {
    travelers?: true
    estimatedTravelHours?: true
  }

  export type TripSumAggregateInputType = {
    travelers?: true
    estimatedTravelHours?: true
  }

  export type TripMinAggregateInputType = {
    id?: true
    name?: true
    destination?: true
    startDate?: true
    endDate?: true
    travelers?: true
    originCity?: true
    transportMode?: true
    estimatedTravelHours?: true
    createdAt?: true
    shareToken?: true
    tripCode?: true
  }

  export type TripMaxAggregateInputType = {
    id?: true
    name?: true
    destination?: true
    startDate?: true
    endDate?: true
    travelers?: true
    originCity?: true
    transportMode?: true
    estimatedTravelHours?: true
    createdAt?: true
    shareToken?: true
    tripCode?: true
  }

  export type TripCountAggregateInputType = {
    id?: true
    name?: true
    destination?: true
    startDate?: true
    endDate?: true
    travelers?: true
    originCity?: true
    transportMode?: true
    estimatedTravelHours?: true
    createdAt?: true
    shareToken?: true
    tripCode?: true
    dailySummaries?: true
    _all?: true
  }

  export type TripAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trip to aggregate.
     */
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     */
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trips
    **/
    _count?: true | TripCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TripAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TripSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TripMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TripMaxAggregateInputType
  }

  export type GetTripAggregateType<T extends TripAggregateArgs> = {
        [P in keyof T & keyof AggregateTrip]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrip[P]>
      : GetScalarType<T[P], AggregateTrip[P]>
  }




  export type TripGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TripWhereInput
    orderBy?: TripOrderByWithAggregationInput | TripOrderByWithAggregationInput[]
    by: TripScalarFieldEnum[] | TripScalarFieldEnum
    having?: TripScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TripCountAggregateInputType | true
    _avg?: TripAvgAggregateInputType
    _sum?: TripSumAggregateInputType
    _min?: TripMinAggregateInputType
    _max?: TripMaxAggregateInputType
  }

  export type TripGroupByOutputType = {
    id: string
    name: string
    destination: string
    startDate: Date
    endDate: Date
    travelers: number
    originCity: string
    transportMode: string
    estimatedTravelHours: number
    createdAt: Date
    shareToken: string
    tripCode: string | null
    dailySummaries: JsonValue | null
    _count: TripCountAggregateOutputType | null
    _avg: TripAvgAggregateOutputType | null
    _sum: TripSumAggregateOutputType | null
    _min: TripMinAggregateOutputType | null
    _max: TripMaxAggregateOutputType | null
  }

  type GetTripGroupByPayload<T extends TripGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TripGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TripGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TripGroupByOutputType[P]>
            : GetScalarType<T[P], TripGroupByOutputType[P]>
        }
      >
    >


  export type TripSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    destination?: boolean
    startDate?: boolean
    endDate?: boolean
    travelers?: boolean
    originCity?: boolean
    transportMode?: boolean
    estimatedTravelHours?: boolean
    createdAt?: boolean
    shareToken?: boolean
    tripCode?: boolean
    dailySummaries?: boolean
    collaborators?: boolean | Trip$collaboratorsArgs<ExtArgs>
    items?: boolean | Trip$itemsArgs<ExtArgs>
    hotels?: boolean | Trip$hotelsArgs<ExtArgs>
    messages?: boolean | Trip$messagesArgs<ExtArgs>
    _count?: boolean | TripCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trip"]>

  export type TripSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    destination?: boolean
    startDate?: boolean
    endDate?: boolean
    travelers?: boolean
    originCity?: boolean
    transportMode?: boolean
    estimatedTravelHours?: boolean
    createdAt?: boolean
    shareToken?: boolean
    tripCode?: boolean
    dailySummaries?: boolean
  }, ExtArgs["result"]["trip"]>

  export type TripSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    destination?: boolean
    startDate?: boolean
    endDate?: boolean
    travelers?: boolean
    originCity?: boolean
    transportMode?: boolean
    estimatedTravelHours?: boolean
    createdAt?: boolean
    shareToken?: boolean
    tripCode?: boolean
    dailySummaries?: boolean
  }, ExtArgs["result"]["trip"]>

  export type TripSelectScalar = {
    id?: boolean
    name?: boolean
    destination?: boolean
    startDate?: boolean
    endDate?: boolean
    travelers?: boolean
    originCity?: boolean
    transportMode?: boolean
    estimatedTravelHours?: boolean
    createdAt?: boolean
    shareToken?: boolean
    tripCode?: boolean
    dailySummaries?: boolean
  }

  export type TripOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "destination" | "startDate" | "endDate" | "travelers" | "originCity" | "transportMode" | "estimatedTravelHours" | "createdAt" | "shareToken" | "tripCode" | "dailySummaries", ExtArgs["result"]["trip"]>
  export type TripInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collaborators?: boolean | Trip$collaboratorsArgs<ExtArgs>
    items?: boolean | Trip$itemsArgs<ExtArgs>
    hotels?: boolean | Trip$hotelsArgs<ExtArgs>
    messages?: boolean | Trip$messagesArgs<ExtArgs>
    _count?: boolean | TripCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TripIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TripIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TripPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trip"
    objects: {
      collaborators: Prisma.$CollaboratorPayload<ExtArgs>[]
      items: Prisma.$ItineraryItemPayload<ExtArgs>[]
      hotels: Prisma.$HotelPayload<ExtArgs>[]
      messages: Prisma.$TripMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      destination: string
      startDate: Date
      endDate: Date
      travelers: number
      originCity: string
      transportMode: string
      estimatedTravelHours: number
      createdAt: Date
      shareToken: string
      tripCode: string | null
      dailySummaries: Prisma.JsonValue | null
    }, ExtArgs["result"]["trip"]>
    composites: {}
  }

  type TripGetPayload<S extends boolean | null | undefined | TripDefaultArgs> = $Result.GetResult<Prisma.$TripPayload, S>

  type TripCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TripFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TripCountAggregateInputType | true
    }

  export interface TripDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trip'], meta: { name: 'Trip' } }
    /**
     * Find zero or one Trip that matches the filter.
     * @param {TripFindUniqueArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TripFindUniqueArgs>(args: SelectSubset<T, TripFindUniqueArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trip that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TripFindUniqueOrThrowArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TripFindUniqueOrThrowArgs>(args: SelectSubset<T, TripFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trip that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindFirstArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TripFindFirstArgs>(args?: SelectSubset<T, TripFindFirstArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trip that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindFirstOrThrowArgs} args - Arguments to find a Trip
     * @example
     * // Get one Trip
     * const trip = await prisma.trip.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TripFindFirstOrThrowArgs>(args?: SelectSubset<T, TripFindFirstOrThrowArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trips
     * const trips = await prisma.trip.findMany()
     * 
     * // Get first 10 Trips
     * const trips = await prisma.trip.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tripWithIdOnly = await prisma.trip.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TripFindManyArgs>(args?: SelectSubset<T, TripFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trip.
     * @param {TripCreateArgs} args - Arguments to create a Trip.
     * @example
     * // Create one Trip
     * const Trip = await prisma.trip.create({
     *   data: {
     *     // ... data to create a Trip
     *   }
     * })
     * 
     */
    create<T extends TripCreateArgs>(args: SelectSubset<T, TripCreateArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trips.
     * @param {TripCreateManyArgs} args - Arguments to create many Trips.
     * @example
     * // Create many Trips
     * const trip = await prisma.trip.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TripCreateManyArgs>(args?: SelectSubset<T, TripCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trips and returns the data saved in the database.
     * @param {TripCreateManyAndReturnArgs} args - Arguments to create many Trips.
     * @example
     * // Create many Trips
     * const trip = await prisma.trip.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trips and only return the `id`
     * const tripWithIdOnly = await prisma.trip.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TripCreateManyAndReturnArgs>(args?: SelectSubset<T, TripCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trip.
     * @param {TripDeleteArgs} args - Arguments to delete one Trip.
     * @example
     * // Delete one Trip
     * const Trip = await prisma.trip.delete({
     *   where: {
     *     // ... filter to delete one Trip
     *   }
     * })
     * 
     */
    delete<T extends TripDeleteArgs>(args: SelectSubset<T, TripDeleteArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trip.
     * @param {TripUpdateArgs} args - Arguments to update one Trip.
     * @example
     * // Update one Trip
     * const trip = await prisma.trip.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TripUpdateArgs>(args: SelectSubset<T, TripUpdateArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trips.
     * @param {TripDeleteManyArgs} args - Arguments to filter Trips to delete.
     * @example
     * // Delete a few Trips
     * const { count } = await prisma.trip.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TripDeleteManyArgs>(args?: SelectSubset<T, TripDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trips
     * const trip = await prisma.trip.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TripUpdateManyArgs>(args: SelectSubset<T, TripUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trips and returns the data updated in the database.
     * @param {TripUpdateManyAndReturnArgs} args - Arguments to update many Trips.
     * @example
     * // Update many Trips
     * const trip = await prisma.trip.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trips and only return the `id`
     * const tripWithIdOnly = await prisma.trip.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TripUpdateManyAndReturnArgs>(args: SelectSubset<T, TripUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trip.
     * @param {TripUpsertArgs} args - Arguments to update or create a Trip.
     * @example
     * // Update or create a Trip
     * const trip = await prisma.trip.upsert({
     *   create: {
     *     // ... data to create a Trip
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trip we want to update
     *   }
     * })
     */
    upsert<T extends TripUpsertArgs>(args: SelectSubset<T, TripUpsertArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripCountArgs} args - Arguments to filter Trips to count.
     * @example
     * // Count the number of Trips
     * const count = await prisma.trip.count({
     *   where: {
     *     // ... the filter for the Trips we want to count
     *   }
     * })
    **/
    count<T extends TripCountArgs>(
      args?: Subset<T, TripCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TripCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TripAggregateArgs>(args: Subset<T, TripAggregateArgs>): Prisma.PrismaPromise<GetTripAggregateType<T>>

    /**
     * Group by Trip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TripGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TripGroupByArgs['orderBy'] }
        : { orderBy?: TripGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TripGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTripGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trip model
   */
  readonly fields: TripFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trip.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TripClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collaborators<T extends Trip$collaboratorsArgs<ExtArgs> = {}>(args?: Subset<T, Trip$collaboratorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    items<T extends Trip$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Trip$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    hotels<T extends Trip$hotelsArgs<ExtArgs> = {}>(args?: Subset<T, Trip$hotelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HotelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends Trip$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Trip$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trip model
   */
  interface TripFieldRefs {
    readonly id: FieldRef<"Trip", 'String'>
    readonly name: FieldRef<"Trip", 'String'>
    readonly destination: FieldRef<"Trip", 'String'>
    readonly startDate: FieldRef<"Trip", 'DateTime'>
    readonly endDate: FieldRef<"Trip", 'DateTime'>
    readonly travelers: FieldRef<"Trip", 'Int'>
    readonly originCity: FieldRef<"Trip", 'String'>
    readonly transportMode: FieldRef<"Trip", 'String'>
    readonly estimatedTravelHours: FieldRef<"Trip", 'Float'>
    readonly createdAt: FieldRef<"Trip", 'DateTime'>
    readonly shareToken: FieldRef<"Trip", 'String'>
    readonly tripCode: FieldRef<"Trip", 'String'>
    readonly dailySummaries: FieldRef<"Trip", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Trip findUnique
   */
  export type TripFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trip to fetch.
     */
    where: TripWhereUniqueInput
  }

  /**
   * Trip findUniqueOrThrow
   */
  export type TripFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trip to fetch.
     */
    where: TripWhereUniqueInput
  }

  /**
   * Trip findFirst
   */
  export type TripFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trip to fetch.
     */
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     */
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trips.
     */
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trips.
     */
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * Trip findFirstOrThrow
   */
  export type TripFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trip to fetch.
     */
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     */
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trips.
     */
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trips.
     */
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * Trip findMany
   */
  export type TripFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter, which Trips to fetch.
     */
    where?: TripWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trips to fetch.
     */
    orderBy?: TripOrderByWithRelationInput | TripOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trips.
     */
    cursor?: TripWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trips.
     */
    distinct?: TripScalarFieldEnum | TripScalarFieldEnum[]
  }

  /**
   * Trip create
   */
  export type TripCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * The data needed to create a Trip.
     */
    data: XOR<TripCreateInput, TripUncheckedCreateInput>
  }

  /**
   * Trip createMany
   */
  export type TripCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trips.
     */
    data: TripCreateManyInput | TripCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trip createManyAndReturn
   */
  export type TripCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * The data used to create many Trips.
     */
    data: TripCreateManyInput | TripCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trip update
   */
  export type TripUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * The data needed to update a Trip.
     */
    data: XOR<TripUpdateInput, TripUncheckedUpdateInput>
    /**
     * Choose, which Trip to update.
     */
    where: TripWhereUniqueInput
  }

  /**
   * Trip updateMany
   */
  export type TripUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trips.
     */
    data: XOR<TripUpdateManyMutationInput, TripUncheckedUpdateManyInput>
    /**
     * Filter which Trips to update
     */
    where?: TripWhereInput
    /**
     * Limit how many Trips to update.
     */
    limit?: number
  }

  /**
   * Trip updateManyAndReturn
   */
  export type TripUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * The data used to update Trips.
     */
    data: XOR<TripUpdateManyMutationInput, TripUncheckedUpdateManyInput>
    /**
     * Filter which Trips to update
     */
    where?: TripWhereInput
    /**
     * Limit how many Trips to update.
     */
    limit?: number
  }

  /**
   * Trip upsert
   */
  export type TripUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * The filter to search for the Trip to update in case it exists.
     */
    where: TripWhereUniqueInput
    /**
     * In case the Trip found by the `where` argument doesn't exist, create a new Trip with this data.
     */
    create: XOR<TripCreateInput, TripUncheckedCreateInput>
    /**
     * In case the Trip was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TripUpdateInput, TripUncheckedUpdateInput>
  }

  /**
   * Trip delete
   */
  export type TripDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
    /**
     * Filter which Trip to delete.
     */
    where: TripWhereUniqueInput
  }

  /**
   * Trip deleteMany
   */
  export type TripDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trips to delete
     */
    where?: TripWhereInput
    /**
     * Limit how many Trips to delete.
     */
    limit?: number
  }

  /**
   * Trip.collaborators
   */
  export type Trip$collaboratorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    where?: CollaboratorWhereInput
    orderBy?: CollaboratorOrderByWithRelationInput | CollaboratorOrderByWithRelationInput[]
    cursor?: CollaboratorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CollaboratorScalarFieldEnum | CollaboratorScalarFieldEnum[]
  }

  /**
   * Trip.items
   */
  export type Trip$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    where?: ItineraryItemWhereInput
    orderBy?: ItineraryItemOrderByWithRelationInput | ItineraryItemOrderByWithRelationInput[]
    cursor?: ItineraryItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItineraryItemScalarFieldEnum | ItineraryItemScalarFieldEnum[]
  }

  /**
   * Trip.hotels
   */
  export type Trip$hotelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hotel
     */
    select?: HotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hotel
     */
    omit?: HotelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HotelInclude<ExtArgs> | null
    where?: HotelWhereInput
    orderBy?: HotelOrderByWithRelationInput | HotelOrderByWithRelationInput[]
    cursor?: HotelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HotelScalarFieldEnum | HotelScalarFieldEnum[]
  }

  /**
   * Trip.messages
   */
  export type Trip$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripMessage
     */
    select?: TripMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripMessage
     */
    omit?: TripMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripMessageInclude<ExtArgs> | null
    where?: TripMessageWhereInput
    orderBy?: TripMessageOrderByWithRelationInput | TripMessageOrderByWithRelationInput[]
    cursor?: TripMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TripMessageScalarFieldEnum | TripMessageScalarFieldEnum[]
  }

  /**
   * Trip without action
   */
  export type TripDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trip
     */
    select?: TripSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trip
     */
    omit?: TripOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripInclude<ExtArgs> | null
  }


  /**
   * Model Collaborator
   */

  export type AggregateCollaborator = {
    _count: CollaboratorCountAggregateOutputType | null
    _min: CollaboratorMinAggregateOutputType | null
    _max: CollaboratorMaxAggregateOutputType | null
  }

  export type CollaboratorMinAggregateOutputType = {
    id: string | null
    tripId: string | null
    userId: string | null
    role: string | null
  }

  export type CollaboratorMaxAggregateOutputType = {
    id: string | null
    tripId: string | null
    userId: string | null
    role: string | null
  }

  export type CollaboratorCountAggregateOutputType = {
    id: number
    tripId: number
    userId: number
    role: number
    _all: number
  }


  export type CollaboratorMinAggregateInputType = {
    id?: true
    tripId?: true
    userId?: true
    role?: true
  }

  export type CollaboratorMaxAggregateInputType = {
    id?: true
    tripId?: true
    userId?: true
    role?: true
  }

  export type CollaboratorCountAggregateInputType = {
    id?: true
    tripId?: true
    userId?: true
    role?: true
    _all?: true
  }

  export type CollaboratorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collaborator to aggregate.
     */
    where?: CollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborators to fetch.
     */
    orderBy?: CollaboratorOrderByWithRelationInput | CollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Collaborators
    **/
    _count?: true | CollaboratorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CollaboratorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CollaboratorMaxAggregateInputType
  }

  export type GetCollaboratorAggregateType<T extends CollaboratorAggregateArgs> = {
        [P in keyof T & keyof AggregateCollaborator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCollaborator[P]>
      : GetScalarType<T[P], AggregateCollaborator[P]>
  }




  export type CollaboratorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollaboratorWhereInput
    orderBy?: CollaboratorOrderByWithAggregationInput | CollaboratorOrderByWithAggregationInput[]
    by: CollaboratorScalarFieldEnum[] | CollaboratorScalarFieldEnum
    having?: CollaboratorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CollaboratorCountAggregateInputType | true
    _min?: CollaboratorMinAggregateInputType
    _max?: CollaboratorMaxAggregateInputType
  }

  export type CollaboratorGroupByOutputType = {
    id: string
    tripId: string
    userId: string
    role: string
    _count: CollaboratorCountAggregateOutputType | null
    _min: CollaboratorMinAggregateOutputType | null
    _max: CollaboratorMaxAggregateOutputType | null
  }

  type GetCollaboratorGroupByPayload<T extends CollaboratorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CollaboratorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CollaboratorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CollaboratorGroupByOutputType[P]>
            : GetScalarType<T[P], CollaboratorGroupByOutputType[P]>
        }
      >
    >


  export type CollaboratorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    userId?: boolean
    role?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collaborator"]>

  export type CollaboratorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    userId?: boolean
    role?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collaborator"]>

  export type CollaboratorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    userId?: boolean
    role?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collaborator"]>

  export type CollaboratorSelectScalar = {
    id?: boolean
    tripId?: boolean
    userId?: boolean
    role?: boolean
  }

  export type CollaboratorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tripId" | "userId" | "role", ExtArgs["result"]["collaborator"]>
  export type CollaboratorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CollaboratorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CollaboratorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CollaboratorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Collaborator"
    objects: {
      trip: Prisma.$TripPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tripId: string
      userId: string
      role: string
    }, ExtArgs["result"]["collaborator"]>
    composites: {}
  }

  type CollaboratorGetPayload<S extends boolean | null | undefined | CollaboratorDefaultArgs> = $Result.GetResult<Prisma.$CollaboratorPayload, S>

  type CollaboratorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CollaboratorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CollaboratorCountAggregateInputType | true
    }

  export interface CollaboratorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Collaborator'], meta: { name: 'Collaborator' } }
    /**
     * Find zero or one Collaborator that matches the filter.
     * @param {CollaboratorFindUniqueArgs} args - Arguments to find a Collaborator
     * @example
     * // Get one Collaborator
     * const collaborator = await prisma.collaborator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CollaboratorFindUniqueArgs>(args: SelectSubset<T, CollaboratorFindUniqueArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Collaborator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CollaboratorFindUniqueOrThrowArgs} args - Arguments to find a Collaborator
     * @example
     * // Get one Collaborator
     * const collaborator = await prisma.collaborator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CollaboratorFindUniqueOrThrowArgs>(args: SelectSubset<T, CollaboratorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collaborator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorFindFirstArgs} args - Arguments to find a Collaborator
     * @example
     * // Get one Collaborator
     * const collaborator = await prisma.collaborator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CollaboratorFindFirstArgs>(args?: SelectSubset<T, CollaboratorFindFirstArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collaborator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorFindFirstOrThrowArgs} args - Arguments to find a Collaborator
     * @example
     * // Get one Collaborator
     * const collaborator = await prisma.collaborator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CollaboratorFindFirstOrThrowArgs>(args?: SelectSubset<T, CollaboratorFindFirstOrThrowArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Collaborators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Collaborators
     * const collaborators = await prisma.collaborator.findMany()
     * 
     * // Get first 10 Collaborators
     * const collaborators = await prisma.collaborator.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const collaboratorWithIdOnly = await prisma.collaborator.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CollaboratorFindManyArgs>(args?: SelectSubset<T, CollaboratorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Collaborator.
     * @param {CollaboratorCreateArgs} args - Arguments to create a Collaborator.
     * @example
     * // Create one Collaborator
     * const Collaborator = await prisma.collaborator.create({
     *   data: {
     *     // ... data to create a Collaborator
     *   }
     * })
     * 
     */
    create<T extends CollaboratorCreateArgs>(args: SelectSubset<T, CollaboratorCreateArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Collaborators.
     * @param {CollaboratorCreateManyArgs} args - Arguments to create many Collaborators.
     * @example
     * // Create many Collaborators
     * const collaborator = await prisma.collaborator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CollaboratorCreateManyArgs>(args?: SelectSubset<T, CollaboratorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Collaborators and returns the data saved in the database.
     * @param {CollaboratorCreateManyAndReturnArgs} args - Arguments to create many Collaborators.
     * @example
     * // Create many Collaborators
     * const collaborator = await prisma.collaborator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Collaborators and only return the `id`
     * const collaboratorWithIdOnly = await prisma.collaborator.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CollaboratorCreateManyAndReturnArgs>(args?: SelectSubset<T, CollaboratorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Collaborator.
     * @param {CollaboratorDeleteArgs} args - Arguments to delete one Collaborator.
     * @example
     * // Delete one Collaborator
     * const Collaborator = await prisma.collaborator.delete({
     *   where: {
     *     // ... filter to delete one Collaborator
     *   }
     * })
     * 
     */
    delete<T extends CollaboratorDeleteArgs>(args: SelectSubset<T, CollaboratorDeleteArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Collaborator.
     * @param {CollaboratorUpdateArgs} args - Arguments to update one Collaborator.
     * @example
     * // Update one Collaborator
     * const collaborator = await prisma.collaborator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CollaboratorUpdateArgs>(args: SelectSubset<T, CollaboratorUpdateArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Collaborators.
     * @param {CollaboratorDeleteManyArgs} args - Arguments to filter Collaborators to delete.
     * @example
     * // Delete a few Collaborators
     * const { count } = await prisma.collaborator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CollaboratorDeleteManyArgs>(args?: SelectSubset<T, CollaboratorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collaborators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Collaborators
     * const collaborator = await prisma.collaborator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CollaboratorUpdateManyArgs>(args: SelectSubset<T, CollaboratorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collaborators and returns the data updated in the database.
     * @param {CollaboratorUpdateManyAndReturnArgs} args - Arguments to update many Collaborators.
     * @example
     * // Update many Collaborators
     * const collaborator = await prisma.collaborator.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Collaborators and only return the `id`
     * const collaboratorWithIdOnly = await prisma.collaborator.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CollaboratorUpdateManyAndReturnArgs>(args: SelectSubset<T, CollaboratorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Collaborator.
     * @param {CollaboratorUpsertArgs} args - Arguments to update or create a Collaborator.
     * @example
     * // Update or create a Collaborator
     * const collaborator = await prisma.collaborator.upsert({
     *   create: {
     *     // ... data to create a Collaborator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Collaborator we want to update
     *   }
     * })
     */
    upsert<T extends CollaboratorUpsertArgs>(args: SelectSubset<T, CollaboratorUpsertArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Collaborators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorCountArgs} args - Arguments to filter Collaborators to count.
     * @example
     * // Count the number of Collaborators
     * const count = await prisma.collaborator.count({
     *   where: {
     *     // ... the filter for the Collaborators we want to count
     *   }
     * })
    **/
    count<T extends CollaboratorCountArgs>(
      args?: Subset<T, CollaboratorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CollaboratorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Collaborator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CollaboratorAggregateArgs>(args: Subset<T, CollaboratorAggregateArgs>): Prisma.PrismaPromise<GetCollaboratorAggregateType<T>>

    /**
     * Group by Collaborator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CollaboratorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CollaboratorGroupByArgs['orderBy'] }
        : { orderBy?: CollaboratorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CollaboratorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCollaboratorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Collaborator model
   */
  readonly fields: CollaboratorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Collaborator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CollaboratorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trip<T extends TripDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TripDefaultArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Collaborator model
   */
  interface CollaboratorFieldRefs {
    readonly id: FieldRef<"Collaborator", 'String'>
    readonly tripId: FieldRef<"Collaborator", 'String'>
    readonly userId: FieldRef<"Collaborator", 'String'>
    readonly role: FieldRef<"Collaborator", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Collaborator findUnique
   */
  export type CollaboratorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which Collaborator to fetch.
     */
    where: CollaboratorWhereUniqueInput
  }

  /**
   * Collaborator findUniqueOrThrow
   */
  export type CollaboratorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which Collaborator to fetch.
     */
    where: CollaboratorWhereUniqueInput
  }

  /**
   * Collaborator findFirst
   */
  export type CollaboratorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which Collaborator to fetch.
     */
    where?: CollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborators to fetch.
     */
    orderBy?: CollaboratorOrderByWithRelationInput | CollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collaborators.
     */
    cursor?: CollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collaborators.
     */
    distinct?: CollaboratorScalarFieldEnum | CollaboratorScalarFieldEnum[]
  }

  /**
   * Collaborator findFirstOrThrow
   */
  export type CollaboratorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which Collaborator to fetch.
     */
    where?: CollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborators to fetch.
     */
    orderBy?: CollaboratorOrderByWithRelationInput | CollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collaborators.
     */
    cursor?: CollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collaborators.
     */
    distinct?: CollaboratorScalarFieldEnum | CollaboratorScalarFieldEnum[]
  }

  /**
   * Collaborator findMany
   */
  export type CollaboratorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which Collaborators to fetch.
     */
    where?: CollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborators to fetch.
     */
    orderBy?: CollaboratorOrderByWithRelationInput | CollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Collaborators.
     */
    cursor?: CollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collaborators.
     */
    distinct?: CollaboratorScalarFieldEnum | CollaboratorScalarFieldEnum[]
  }

  /**
   * Collaborator create
   */
  export type CollaboratorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * The data needed to create a Collaborator.
     */
    data: XOR<CollaboratorCreateInput, CollaboratorUncheckedCreateInput>
  }

  /**
   * Collaborator createMany
   */
  export type CollaboratorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Collaborators.
     */
    data: CollaboratorCreateManyInput | CollaboratorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Collaborator createManyAndReturn
   */
  export type CollaboratorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * The data used to create many Collaborators.
     */
    data: CollaboratorCreateManyInput | CollaboratorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Collaborator update
   */
  export type CollaboratorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * The data needed to update a Collaborator.
     */
    data: XOR<CollaboratorUpdateInput, CollaboratorUncheckedUpdateInput>
    /**
     * Choose, which Collaborator to update.
     */
    where: CollaboratorWhereUniqueInput
  }

  /**
   * Collaborator updateMany
   */
  export type CollaboratorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Collaborators.
     */
    data: XOR<CollaboratorUpdateManyMutationInput, CollaboratorUncheckedUpdateManyInput>
    /**
     * Filter which Collaborators to update
     */
    where?: CollaboratorWhereInput
    /**
     * Limit how many Collaborators to update.
     */
    limit?: number
  }

  /**
   * Collaborator updateManyAndReturn
   */
  export type CollaboratorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * The data used to update Collaborators.
     */
    data: XOR<CollaboratorUpdateManyMutationInput, CollaboratorUncheckedUpdateManyInput>
    /**
     * Filter which Collaborators to update
     */
    where?: CollaboratorWhereInput
    /**
     * Limit how many Collaborators to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Collaborator upsert
   */
  export type CollaboratorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * The filter to search for the Collaborator to update in case it exists.
     */
    where: CollaboratorWhereUniqueInput
    /**
     * In case the Collaborator found by the `where` argument doesn't exist, create a new Collaborator with this data.
     */
    create: XOR<CollaboratorCreateInput, CollaboratorUncheckedCreateInput>
    /**
     * In case the Collaborator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CollaboratorUpdateInput, CollaboratorUncheckedUpdateInput>
  }

  /**
   * Collaborator delete
   */
  export type CollaboratorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * Filter which Collaborator to delete.
     */
    where: CollaboratorWhereUniqueInput
  }

  /**
   * Collaborator deleteMany
   */
  export type CollaboratorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collaborators to delete
     */
    where?: CollaboratorWhereInput
    /**
     * Limit how many Collaborators to delete.
     */
    limit?: number
  }

  /**
   * Collaborator without action
   */
  export type CollaboratorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
  }


  /**
   * Model ItineraryItem
   */

  export type AggregateItineraryItem = {
    _count: ItineraryItemCountAggregateOutputType | null
    _avg: ItineraryItemAvgAggregateOutputType | null
    _sum: ItineraryItemSumAggregateOutputType | null
    _min: ItineraryItemMinAggregateOutputType | null
    _max: ItineraryItemMaxAggregateOutputType | null
  }

  export type ItineraryItemAvgAggregateOutputType = {
    day: number | null
    position: number | null
    lat: number | null
    lng: number | null
    durationMinutes: number | null
    estimatedCost: number | null
    travelTimeFromPrevious: number | null
  }

  export type ItineraryItemSumAggregateOutputType = {
    day: number | null
    position: number | null
    lat: number | null
    lng: number | null
    durationMinutes: number | null
    estimatedCost: number | null
    travelTimeFromPrevious: number | null
  }

  export type ItineraryItemMinAggregateOutputType = {
    id: string | null
    tripId: string | null
    day: number | null
    position: number | null
    type: string | null
    time: string | null
    activity: string | null
    location: string | null
    lat: number | null
    lng: number | null
    durationMinutes: number | null
    estimatedCost: number | null
    category: string | null
    notes: string | null
    travelTimeFromPrevious: number | null
    hasTimingConflict: boolean | null
    createdAt: Date | null
  }

  export type ItineraryItemMaxAggregateOutputType = {
    id: string | null
    tripId: string | null
    day: number | null
    position: number | null
    type: string | null
    time: string | null
    activity: string | null
    location: string | null
    lat: number | null
    lng: number | null
    durationMinutes: number | null
    estimatedCost: number | null
    category: string | null
    notes: string | null
    travelTimeFromPrevious: number | null
    hasTimingConflict: boolean | null
    createdAt: Date | null
  }

  export type ItineraryItemCountAggregateOutputType = {
    id: number
    tripId: number
    day: number
    position: number
    type: number
    time: number
    activity: number
    location: number
    lat: number
    lng: number
    durationMinutes: number
    estimatedCost: number
    category: number
    notes: number
    travelTimeFromPrevious: number
    hasTimingConflict: number
    createdAt: number
    _all: number
  }


  export type ItineraryItemAvgAggregateInputType = {
    day?: true
    position?: true
    lat?: true
    lng?: true
    durationMinutes?: true
    estimatedCost?: true
    travelTimeFromPrevious?: true
  }

  export type ItineraryItemSumAggregateInputType = {
    day?: true
    position?: true
    lat?: true
    lng?: true
    durationMinutes?: true
    estimatedCost?: true
    travelTimeFromPrevious?: true
  }

  export type ItineraryItemMinAggregateInputType = {
    id?: true
    tripId?: true
    day?: true
    position?: true
    type?: true
    time?: true
    activity?: true
    location?: true
    lat?: true
    lng?: true
    durationMinutes?: true
    estimatedCost?: true
    category?: true
    notes?: true
    travelTimeFromPrevious?: true
    hasTimingConflict?: true
    createdAt?: true
  }

  export type ItineraryItemMaxAggregateInputType = {
    id?: true
    tripId?: true
    day?: true
    position?: true
    type?: true
    time?: true
    activity?: true
    location?: true
    lat?: true
    lng?: true
    durationMinutes?: true
    estimatedCost?: true
    category?: true
    notes?: true
    travelTimeFromPrevious?: true
    hasTimingConflict?: true
    createdAt?: true
  }

  export type ItineraryItemCountAggregateInputType = {
    id?: true
    tripId?: true
    day?: true
    position?: true
    type?: true
    time?: true
    activity?: true
    location?: true
    lat?: true
    lng?: true
    durationMinutes?: true
    estimatedCost?: true
    category?: true
    notes?: true
    travelTimeFromPrevious?: true
    hasTimingConflict?: true
    createdAt?: true
    _all?: true
  }

  export type ItineraryItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItineraryItem to aggregate.
     */
    where?: ItineraryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItineraryItems to fetch.
     */
    orderBy?: ItineraryItemOrderByWithRelationInput | ItineraryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItineraryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItineraryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItineraryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItineraryItems
    **/
    _count?: true | ItineraryItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItineraryItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItineraryItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItineraryItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItineraryItemMaxAggregateInputType
  }

  export type GetItineraryItemAggregateType<T extends ItineraryItemAggregateArgs> = {
        [P in keyof T & keyof AggregateItineraryItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItineraryItem[P]>
      : GetScalarType<T[P], AggregateItineraryItem[P]>
  }




  export type ItineraryItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItineraryItemWhereInput
    orderBy?: ItineraryItemOrderByWithAggregationInput | ItineraryItemOrderByWithAggregationInput[]
    by: ItineraryItemScalarFieldEnum[] | ItineraryItemScalarFieldEnum
    having?: ItineraryItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItineraryItemCountAggregateInputType | true
    _avg?: ItineraryItemAvgAggregateInputType
    _sum?: ItineraryItemSumAggregateInputType
    _min?: ItineraryItemMinAggregateInputType
    _max?: ItineraryItemMaxAggregateInputType
  }

  export type ItineraryItemGroupByOutputType = {
    id: string
    tripId: string
    day: number
    position: number
    type: string
    time: string
    activity: string
    location: string
    lat: number | null
    lng: number | null
    durationMinutes: number
    estimatedCost: number
    category: string
    notes: string | null
    travelTimeFromPrevious: number | null
    hasTimingConflict: boolean
    createdAt: Date
    _count: ItineraryItemCountAggregateOutputType | null
    _avg: ItineraryItemAvgAggregateOutputType | null
    _sum: ItineraryItemSumAggregateOutputType | null
    _min: ItineraryItemMinAggregateOutputType | null
    _max: ItineraryItemMaxAggregateOutputType | null
  }

  type GetItineraryItemGroupByPayload<T extends ItineraryItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItineraryItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItineraryItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItineraryItemGroupByOutputType[P]>
            : GetScalarType<T[P], ItineraryItemGroupByOutputType[P]>
        }
      >
    >


  export type ItineraryItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    day?: boolean
    position?: boolean
    type?: boolean
    time?: boolean
    activity?: boolean
    location?: boolean
    lat?: boolean
    lng?: boolean
    durationMinutes?: boolean
    estimatedCost?: boolean
    category?: boolean
    notes?: boolean
    travelTimeFromPrevious?: boolean
    hasTimingConflict?: boolean
    createdAt?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itineraryItem"]>

  export type ItineraryItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    day?: boolean
    position?: boolean
    type?: boolean
    time?: boolean
    activity?: boolean
    location?: boolean
    lat?: boolean
    lng?: boolean
    durationMinutes?: boolean
    estimatedCost?: boolean
    category?: boolean
    notes?: boolean
    travelTimeFromPrevious?: boolean
    hasTimingConflict?: boolean
    createdAt?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itineraryItem"]>

  export type ItineraryItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    day?: boolean
    position?: boolean
    type?: boolean
    time?: boolean
    activity?: boolean
    location?: boolean
    lat?: boolean
    lng?: boolean
    durationMinutes?: boolean
    estimatedCost?: boolean
    category?: boolean
    notes?: boolean
    travelTimeFromPrevious?: boolean
    hasTimingConflict?: boolean
    createdAt?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itineraryItem"]>

  export type ItineraryItemSelectScalar = {
    id?: boolean
    tripId?: boolean
    day?: boolean
    position?: boolean
    type?: boolean
    time?: boolean
    activity?: boolean
    location?: boolean
    lat?: boolean
    lng?: boolean
    durationMinutes?: boolean
    estimatedCost?: boolean
    category?: boolean
    notes?: boolean
    travelTimeFromPrevious?: boolean
    hasTimingConflict?: boolean
    createdAt?: boolean
  }

  export type ItineraryItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tripId" | "day" | "position" | "type" | "time" | "activity" | "location" | "lat" | "lng" | "durationMinutes" | "estimatedCost" | "category" | "notes" | "travelTimeFromPrevious" | "hasTimingConflict" | "createdAt", ExtArgs["result"]["itineraryItem"]>
  export type ItineraryItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }
  export type ItineraryItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }
  export type ItineraryItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }

  export type $ItineraryItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItineraryItem"
    objects: {
      trip: Prisma.$TripPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tripId: string
      day: number
      position: number
      type: string
      time: string
      activity: string
      location: string
      lat: number | null
      lng: number | null
      durationMinutes: number
      estimatedCost: number
      category: string
      notes: string | null
      travelTimeFromPrevious: number | null
      hasTimingConflict: boolean
      createdAt: Date
    }, ExtArgs["result"]["itineraryItem"]>
    composites: {}
  }

  type ItineraryItemGetPayload<S extends boolean | null | undefined | ItineraryItemDefaultArgs> = $Result.GetResult<Prisma.$ItineraryItemPayload, S>

  type ItineraryItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItineraryItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItineraryItemCountAggregateInputType | true
    }

  export interface ItineraryItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItineraryItem'], meta: { name: 'ItineraryItem' } }
    /**
     * Find zero or one ItineraryItem that matches the filter.
     * @param {ItineraryItemFindUniqueArgs} args - Arguments to find a ItineraryItem
     * @example
     * // Get one ItineraryItem
     * const itineraryItem = await prisma.itineraryItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItineraryItemFindUniqueArgs>(args: SelectSubset<T, ItineraryItemFindUniqueArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItineraryItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItineraryItemFindUniqueOrThrowArgs} args - Arguments to find a ItineraryItem
     * @example
     * // Get one ItineraryItem
     * const itineraryItem = await prisma.itineraryItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItineraryItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ItineraryItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItineraryItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemFindFirstArgs} args - Arguments to find a ItineraryItem
     * @example
     * // Get one ItineraryItem
     * const itineraryItem = await prisma.itineraryItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItineraryItemFindFirstArgs>(args?: SelectSubset<T, ItineraryItemFindFirstArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItineraryItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemFindFirstOrThrowArgs} args - Arguments to find a ItineraryItem
     * @example
     * // Get one ItineraryItem
     * const itineraryItem = await prisma.itineraryItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItineraryItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ItineraryItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItineraryItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItineraryItems
     * const itineraryItems = await prisma.itineraryItem.findMany()
     * 
     * // Get first 10 ItineraryItems
     * const itineraryItems = await prisma.itineraryItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itineraryItemWithIdOnly = await prisma.itineraryItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItineraryItemFindManyArgs>(args?: SelectSubset<T, ItineraryItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItineraryItem.
     * @param {ItineraryItemCreateArgs} args - Arguments to create a ItineraryItem.
     * @example
     * // Create one ItineraryItem
     * const ItineraryItem = await prisma.itineraryItem.create({
     *   data: {
     *     // ... data to create a ItineraryItem
     *   }
     * })
     * 
     */
    create<T extends ItineraryItemCreateArgs>(args: SelectSubset<T, ItineraryItemCreateArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItineraryItems.
     * @param {ItineraryItemCreateManyArgs} args - Arguments to create many ItineraryItems.
     * @example
     * // Create many ItineraryItems
     * const itineraryItem = await prisma.itineraryItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItineraryItemCreateManyArgs>(args?: SelectSubset<T, ItineraryItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItineraryItems and returns the data saved in the database.
     * @param {ItineraryItemCreateManyAndReturnArgs} args - Arguments to create many ItineraryItems.
     * @example
     * // Create many ItineraryItems
     * const itineraryItem = await prisma.itineraryItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItineraryItems and only return the `id`
     * const itineraryItemWithIdOnly = await prisma.itineraryItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItineraryItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ItineraryItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItineraryItem.
     * @param {ItineraryItemDeleteArgs} args - Arguments to delete one ItineraryItem.
     * @example
     * // Delete one ItineraryItem
     * const ItineraryItem = await prisma.itineraryItem.delete({
     *   where: {
     *     // ... filter to delete one ItineraryItem
     *   }
     * })
     * 
     */
    delete<T extends ItineraryItemDeleteArgs>(args: SelectSubset<T, ItineraryItemDeleteArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItineraryItem.
     * @param {ItineraryItemUpdateArgs} args - Arguments to update one ItineraryItem.
     * @example
     * // Update one ItineraryItem
     * const itineraryItem = await prisma.itineraryItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItineraryItemUpdateArgs>(args: SelectSubset<T, ItineraryItemUpdateArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItineraryItems.
     * @param {ItineraryItemDeleteManyArgs} args - Arguments to filter ItineraryItems to delete.
     * @example
     * // Delete a few ItineraryItems
     * const { count } = await prisma.itineraryItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItineraryItemDeleteManyArgs>(args?: SelectSubset<T, ItineraryItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItineraryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItineraryItems
     * const itineraryItem = await prisma.itineraryItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItineraryItemUpdateManyArgs>(args: SelectSubset<T, ItineraryItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItineraryItems and returns the data updated in the database.
     * @param {ItineraryItemUpdateManyAndReturnArgs} args - Arguments to update many ItineraryItems.
     * @example
     * // Update many ItineraryItems
     * const itineraryItem = await prisma.itineraryItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ItineraryItems and only return the `id`
     * const itineraryItemWithIdOnly = await prisma.itineraryItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItineraryItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ItineraryItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ItineraryItem.
     * @param {ItineraryItemUpsertArgs} args - Arguments to update or create a ItineraryItem.
     * @example
     * // Update or create a ItineraryItem
     * const itineraryItem = await prisma.itineraryItem.upsert({
     *   create: {
     *     // ... data to create a ItineraryItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItineraryItem we want to update
     *   }
     * })
     */
    upsert<T extends ItineraryItemUpsertArgs>(args: SelectSubset<T, ItineraryItemUpsertArgs<ExtArgs>>): Prisma__ItineraryItemClient<$Result.GetResult<Prisma.$ItineraryItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItineraryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemCountArgs} args - Arguments to filter ItineraryItems to count.
     * @example
     * // Count the number of ItineraryItems
     * const count = await prisma.itineraryItem.count({
     *   where: {
     *     // ... the filter for the ItineraryItems we want to count
     *   }
     * })
    **/
    count<T extends ItineraryItemCountArgs>(
      args?: Subset<T, ItineraryItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItineraryItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItineraryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItineraryItemAggregateArgs>(args: Subset<T, ItineraryItemAggregateArgs>): Prisma.PrismaPromise<GetItineraryItemAggregateType<T>>

    /**
     * Group by ItineraryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItineraryItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItineraryItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItineraryItemGroupByArgs['orderBy'] }
        : { orderBy?: ItineraryItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItineraryItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItineraryItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItineraryItem model
   */
  readonly fields: ItineraryItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItineraryItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItineraryItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trip<T extends TripDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TripDefaultArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItineraryItem model
   */
  interface ItineraryItemFieldRefs {
    readonly id: FieldRef<"ItineraryItem", 'String'>
    readonly tripId: FieldRef<"ItineraryItem", 'String'>
    readonly day: FieldRef<"ItineraryItem", 'Int'>
    readonly position: FieldRef<"ItineraryItem", 'Float'>
    readonly type: FieldRef<"ItineraryItem", 'String'>
    readonly time: FieldRef<"ItineraryItem", 'String'>
    readonly activity: FieldRef<"ItineraryItem", 'String'>
    readonly location: FieldRef<"ItineraryItem", 'String'>
    readonly lat: FieldRef<"ItineraryItem", 'Float'>
    readonly lng: FieldRef<"ItineraryItem", 'Float'>
    readonly durationMinutes: FieldRef<"ItineraryItem", 'Int'>
    readonly estimatedCost: FieldRef<"ItineraryItem", 'Int'>
    readonly category: FieldRef<"ItineraryItem", 'String'>
    readonly notes: FieldRef<"ItineraryItem", 'String'>
    readonly travelTimeFromPrevious: FieldRef<"ItineraryItem", 'Int'>
    readonly hasTimingConflict: FieldRef<"ItineraryItem", 'Boolean'>
    readonly createdAt: FieldRef<"ItineraryItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItineraryItem findUnique
   */
  export type ItineraryItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * Filter, which ItineraryItem to fetch.
     */
    where: ItineraryItemWhereUniqueInput
  }

  /**
   * ItineraryItem findUniqueOrThrow
   */
  export type ItineraryItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * Filter, which ItineraryItem to fetch.
     */
    where: ItineraryItemWhereUniqueInput
  }

  /**
   * ItineraryItem findFirst
   */
  export type ItineraryItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * Filter, which ItineraryItem to fetch.
     */
    where?: ItineraryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItineraryItems to fetch.
     */
    orderBy?: ItineraryItemOrderByWithRelationInput | ItineraryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItineraryItems.
     */
    cursor?: ItineraryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItineraryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItineraryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItineraryItems.
     */
    distinct?: ItineraryItemScalarFieldEnum | ItineraryItemScalarFieldEnum[]
  }

  /**
   * ItineraryItem findFirstOrThrow
   */
  export type ItineraryItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * Filter, which ItineraryItem to fetch.
     */
    where?: ItineraryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItineraryItems to fetch.
     */
    orderBy?: ItineraryItemOrderByWithRelationInput | ItineraryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItineraryItems.
     */
    cursor?: ItineraryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItineraryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItineraryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItineraryItems.
     */
    distinct?: ItineraryItemScalarFieldEnum | ItineraryItemScalarFieldEnum[]
  }

  /**
   * ItineraryItem findMany
   */
  export type ItineraryItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * Filter, which ItineraryItems to fetch.
     */
    where?: ItineraryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItineraryItems to fetch.
     */
    orderBy?: ItineraryItemOrderByWithRelationInput | ItineraryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItineraryItems.
     */
    cursor?: ItineraryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItineraryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItineraryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItineraryItems.
     */
    distinct?: ItineraryItemScalarFieldEnum | ItineraryItemScalarFieldEnum[]
  }

  /**
   * ItineraryItem create
   */
  export type ItineraryItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ItineraryItem.
     */
    data: XOR<ItineraryItemCreateInput, ItineraryItemUncheckedCreateInput>
  }

  /**
   * ItineraryItem createMany
   */
  export type ItineraryItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItineraryItems.
     */
    data: ItineraryItemCreateManyInput | ItineraryItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItineraryItem createManyAndReturn
   */
  export type ItineraryItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * The data used to create many ItineraryItems.
     */
    data: ItineraryItemCreateManyInput | ItineraryItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItineraryItem update
   */
  export type ItineraryItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ItineraryItem.
     */
    data: XOR<ItineraryItemUpdateInput, ItineraryItemUncheckedUpdateInput>
    /**
     * Choose, which ItineraryItem to update.
     */
    where: ItineraryItemWhereUniqueInput
  }

  /**
   * ItineraryItem updateMany
   */
  export type ItineraryItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItineraryItems.
     */
    data: XOR<ItineraryItemUpdateManyMutationInput, ItineraryItemUncheckedUpdateManyInput>
    /**
     * Filter which ItineraryItems to update
     */
    where?: ItineraryItemWhereInput
    /**
     * Limit how many ItineraryItems to update.
     */
    limit?: number
  }

  /**
   * ItineraryItem updateManyAndReturn
   */
  export type ItineraryItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * The data used to update ItineraryItems.
     */
    data: XOR<ItineraryItemUpdateManyMutationInput, ItineraryItemUncheckedUpdateManyInput>
    /**
     * Filter which ItineraryItems to update
     */
    where?: ItineraryItemWhereInput
    /**
     * Limit how many ItineraryItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItineraryItem upsert
   */
  export type ItineraryItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ItineraryItem to update in case it exists.
     */
    where: ItineraryItemWhereUniqueInput
    /**
     * In case the ItineraryItem found by the `where` argument doesn't exist, create a new ItineraryItem with this data.
     */
    create: XOR<ItineraryItemCreateInput, ItineraryItemUncheckedCreateInput>
    /**
     * In case the ItineraryItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItineraryItemUpdateInput, ItineraryItemUncheckedUpdateInput>
  }

  /**
   * ItineraryItem delete
   */
  export type ItineraryItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
    /**
     * Filter which ItineraryItem to delete.
     */
    where: ItineraryItemWhereUniqueInput
  }

  /**
   * ItineraryItem deleteMany
   */
  export type ItineraryItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItineraryItems to delete
     */
    where?: ItineraryItemWhereInput
    /**
     * Limit how many ItineraryItems to delete.
     */
    limit?: number
  }

  /**
   * ItineraryItem without action
   */
  export type ItineraryItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItineraryItem
     */
    select?: ItineraryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItineraryItem
     */
    omit?: ItineraryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItineraryItemInclude<ExtArgs> | null
  }


  /**
   * Model LocationCache
   */

  export type AggregateLocationCache = {
    _count: LocationCacheCountAggregateOutputType | null
    _avg: LocationCacheAvgAggregateOutputType | null
    _sum: LocationCacheSumAggregateOutputType | null
    _min: LocationCacheMinAggregateOutputType | null
    _max: LocationCacheMaxAggregateOutputType | null
  }

  export type LocationCacheAvgAggregateOutputType = {
    travelMinutes: number | null
  }

  export type LocationCacheSumAggregateOutputType = {
    travelMinutes: number | null
  }

  export type LocationCacheMinAggregateOutputType = {
    id: string | null
    origin: string | null
    destination: string | null
    travelMinutes: number | null
    cachedAt: Date | null
  }

  export type LocationCacheMaxAggregateOutputType = {
    id: string | null
    origin: string | null
    destination: string | null
    travelMinutes: number | null
    cachedAt: Date | null
  }

  export type LocationCacheCountAggregateOutputType = {
    id: number
    origin: number
    destination: number
    travelMinutes: number
    cachedAt: number
    _all: number
  }


  export type LocationCacheAvgAggregateInputType = {
    travelMinutes?: true
  }

  export type LocationCacheSumAggregateInputType = {
    travelMinutes?: true
  }

  export type LocationCacheMinAggregateInputType = {
    id?: true
    origin?: true
    destination?: true
    travelMinutes?: true
    cachedAt?: true
  }

  export type LocationCacheMaxAggregateInputType = {
    id?: true
    origin?: true
    destination?: true
    travelMinutes?: true
    cachedAt?: true
  }

  export type LocationCacheCountAggregateInputType = {
    id?: true
    origin?: true
    destination?: true
    travelMinutes?: true
    cachedAt?: true
    _all?: true
  }

  export type LocationCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocationCache to aggregate.
     */
    where?: LocationCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationCaches to fetch.
     */
    orderBy?: LocationCacheOrderByWithRelationInput | LocationCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LocationCaches
    **/
    _count?: true | LocationCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationCacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationCacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationCacheMaxAggregateInputType
  }

  export type GetLocationCacheAggregateType<T extends LocationCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateLocationCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocationCache[P]>
      : GetScalarType<T[P], AggregateLocationCache[P]>
  }




  export type LocationCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationCacheWhereInput
    orderBy?: LocationCacheOrderByWithAggregationInput | LocationCacheOrderByWithAggregationInput[]
    by: LocationCacheScalarFieldEnum[] | LocationCacheScalarFieldEnum
    having?: LocationCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCacheCountAggregateInputType | true
    _avg?: LocationCacheAvgAggregateInputType
    _sum?: LocationCacheSumAggregateInputType
    _min?: LocationCacheMinAggregateInputType
    _max?: LocationCacheMaxAggregateInputType
  }

  export type LocationCacheGroupByOutputType = {
    id: string
    origin: string
    destination: string
    travelMinutes: number
    cachedAt: Date
    _count: LocationCacheCountAggregateOutputType | null
    _avg: LocationCacheAvgAggregateOutputType | null
    _sum: LocationCacheSumAggregateOutputType | null
    _min: LocationCacheMinAggregateOutputType | null
    _max: LocationCacheMaxAggregateOutputType | null
  }

  type GetLocationCacheGroupByPayload<T extends LocationCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationCacheGroupByOutputType[P]>
            : GetScalarType<T[P], LocationCacheGroupByOutputType[P]>
        }
      >
    >


  export type LocationCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    origin?: boolean
    destination?: boolean
    travelMinutes?: boolean
    cachedAt?: boolean
  }, ExtArgs["result"]["locationCache"]>

  export type LocationCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    origin?: boolean
    destination?: boolean
    travelMinutes?: boolean
    cachedAt?: boolean
  }, ExtArgs["result"]["locationCache"]>

  export type LocationCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    origin?: boolean
    destination?: boolean
    travelMinutes?: boolean
    cachedAt?: boolean
  }, ExtArgs["result"]["locationCache"]>

  export type LocationCacheSelectScalar = {
    id?: boolean
    origin?: boolean
    destination?: boolean
    travelMinutes?: boolean
    cachedAt?: boolean
  }

  export type LocationCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "origin" | "destination" | "travelMinutes" | "cachedAt", ExtArgs["result"]["locationCache"]>

  export type $LocationCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LocationCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      origin: string
      destination: string
      travelMinutes: number
      cachedAt: Date
    }, ExtArgs["result"]["locationCache"]>
    composites: {}
  }

  type LocationCacheGetPayload<S extends boolean | null | undefined | LocationCacheDefaultArgs> = $Result.GetResult<Prisma.$LocationCachePayload, S>

  type LocationCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCacheCountAggregateInputType | true
    }

  export interface LocationCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LocationCache'], meta: { name: 'LocationCache' } }
    /**
     * Find zero or one LocationCache that matches the filter.
     * @param {LocationCacheFindUniqueArgs} args - Arguments to find a LocationCache
     * @example
     * // Get one LocationCache
     * const locationCache = await prisma.locationCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationCacheFindUniqueArgs>(args: SelectSubset<T, LocationCacheFindUniqueArgs<ExtArgs>>): Prisma__LocationCacheClient<$Result.GetResult<Prisma.$LocationCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LocationCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationCacheFindUniqueOrThrowArgs} args - Arguments to find a LocationCache
     * @example
     * // Get one LocationCache
     * const locationCache = await prisma.locationCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationCacheClient<$Result.GetResult<Prisma.$LocationCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LocationCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCacheFindFirstArgs} args - Arguments to find a LocationCache
     * @example
     * // Get one LocationCache
     * const locationCache = await prisma.locationCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationCacheFindFirstArgs>(args?: SelectSubset<T, LocationCacheFindFirstArgs<ExtArgs>>): Prisma__LocationCacheClient<$Result.GetResult<Prisma.$LocationCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LocationCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCacheFindFirstOrThrowArgs} args - Arguments to find a LocationCache
     * @example
     * // Get one LocationCache
     * const locationCache = await prisma.locationCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationCacheClient<$Result.GetResult<Prisma.$LocationCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LocationCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LocationCaches
     * const locationCaches = await prisma.locationCache.findMany()
     * 
     * // Get first 10 LocationCaches
     * const locationCaches = await prisma.locationCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationCacheWithIdOnly = await prisma.locationCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationCacheFindManyArgs>(args?: SelectSubset<T, LocationCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LocationCache.
     * @param {LocationCacheCreateArgs} args - Arguments to create a LocationCache.
     * @example
     * // Create one LocationCache
     * const LocationCache = await prisma.locationCache.create({
     *   data: {
     *     // ... data to create a LocationCache
     *   }
     * })
     * 
     */
    create<T extends LocationCacheCreateArgs>(args: SelectSubset<T, LocationCacheCreateArgs<ExtArgs>>): Prisma__LocationCacheClient<$Result.GetResult<Prisma.$LocationCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LocationCaches.
     * @param {LocationCacheCreateManyArgs} args - Arguments to create many LocationCaches.
     * @example
     * // Create many LocationCaches
     * const locationCache = await prisma.locationCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCacheCreateManyArgs>(args?: SelectSubset<T, LocationCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LocationCaches and returns the data saved in the database.
     * @param {LocationCacheCreateManyAndReturnArgs} args - Arguments to create many LocationCaches.
     * @example
     * // Create many LocationCaches
     * const locationCache = await prisma.locationCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LocationCaches and only return the `id`
     * const locationCacheWithIdOnly = await prisma.locationCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LocationCache.
     * @param {LocationCacheDeleteArgs} args - Arguments to delete one LocationCache.
     * @example
     * // Delete one LocationCache
     * const LocationCache = await prisma.locationCache.delete({
     *   where: {
     *     // ... filter to delete one LocationCache
     *   }
     * })
     * 
     */
    delete<T extends LocationCacheDeleteArgs>(args: SelectSubset<T, LocationCacheDeleteArgs<ExtArgs>>): Prisma__LocationCacheClient<$Result.GetResult<Prisma.$LocationCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LocationCache.
     * @param {LocationCacheUpdateArgs} args - Arguments to update one LocationCache.
     * @example
     * // Update one LocationCache
     * const locationCache = await prisma.locationCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationCacheUpdateArgs>(args: SelectSubset<T, LocationCacheUpdateArgs<ExtArgs>>): Prisma__LocationCacheClient<$Result.GetResult<Prisma.$LocationCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LocationCaches.
     * @param {LocationCacheDeleteManyArgs} args - Arguments to filter LocationCaches to delete.
     * @example
     * // Delete a few LocationCaches
     * const { count } = await prisma.locationCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationCacheDeleteManyArgs>(args?: SelectSubset<T, LocationCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LocationCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LocationCaches
     * const locationCache = await prisma.locationCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationCacheUpdateManyArgs>(args: SelectSubset<T, LocationCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LocationCaches and returns the data updated in the database.
     * @param {LocationCacheUpdateManyAndReturnArgs} args - Arguments to update many LocationCaches.
     * @example
     * // Update many LocationCaches
     * const locationCache = await prisma.locationCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LocationCaches and only return the `id`
     * const locationCacheWithIdOnly = await prisma.locationCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocationCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LocationCache.
     * @param {LocationCacheUpsertArgs} args - Arguments to update or create a LocationCache.
     * @example
     * // Update or create a LocationCache
     * const locationCache = await prisma.locationCache.upsert({
     *   create: {
     *     // ... data to create a LocationCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LocationCache we want to update
     *   }
     * })
     */
    upsert<T extends LocationCacheUpsertArgs>(args: SelectSubset<T, LocationCacheUpsertArgs<ExtArgs>>): Prisma__LocationCacheClient<$Result.GetResult<Prisma.$LocationCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LocationCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCacheCountArgs} args - Arguments to filter LocationCaches to count.
     * @example
     * // Count the number of LocationCaches
     * const count = await prisma.locationCache.count({
     *   where: {
     *     // ... the filter for the LocationCaches we want to count
     *   }
     * })
    **/
    count<T extends LocationCacheCountArgs>(
      args?: Subset<T, LocationCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LocationCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationCacheAggregateArgs>(args: Subset<T, LocationCacheAggregateArgs>): Prisma.PrismaPromise<GetLocationCacheAggregateType<T>>

    /**
     * Group by LocationCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationCacheGroupByArgs['orderBy'] }
        : { orderBy?: LocationCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LocationCache model
   */
  readonly fields: LocationCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LocationCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LocationCache model
   */
  interface LocationCacheFieldRefs {
    readonly id: FieldRef<"LocationCache", 'String'>
    readonly origin: FieldRef<"LocationCache", 'String'>
    readonly destination: FieldRef<"LocationCache", 'String'>
    readonly travelMinutes: FieldRef<"LocationCache", 'Int'>
    readonly cachedAt: FieldRef<"LocationCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LocationCache findUnique
   */
  export type LocationCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCache
     */
    select?: LocationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationCache
     */
    omit?: LocationCacheOmit<ExtArgs> | null
    /**
     * Filter, which LocationCache to fetch.
     */
    where: LocationCacheWhereUniqueInput
  }

  /**
   * LocationCache findUniqueOrThrow
   */
  export type LocationCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCache
     */
    select?: LocationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationCache
     */
    omit?: LocationCacheOmit<ExtArgs> | null
    /**
     * Filter, which LocationCache to fetch.
     */
    where: LocationCacheWhereUniqueInput
  }

  /**
   * LocationCache findFirst
   */
  export type LocationCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCache
     */
    select?: LocationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationCache
     */
    omit?: LocationCacheOmit<ExtArgs> | null
    /**
     * Filter, which LocationCache to fetch.
     */
    where?: LocationCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationCaches to fetch.
     */
    orderBy?: LocationCacheOrderByWithRelationInput | LocationCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocationCaches.
     */
    cursor?: LocationCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocationCaches.
     */
    distinct?: LocationCacheScalarFieldEnum | LocationCacheScalarFieldEnum[]
  }

  /**
   * LocationCache findFirstOrThrow
   */
  export type LocationCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCache
     */
    select?: LocationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationCache
     */
    omit?: LocationCacheOmit<ExtArgs> | null
    /**
     * Filter, which LocationCache to fetch.
     */
    where?: LocationCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationCaches to fetch.
     */
    orderBy?: LocationCacheOrderByWithRelationInput | LocationCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocationCaches.
     */
    cursor?: LocationCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocationCaches.
     */
    distinct?: LocationCacheScalarFieldEnum | LocationCacheScalarFieldEnum[]
  }

  /**
   * LocationCache findMany
   */
  export type LocationCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCache
     */
    select?: LocationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationCache
     */
    omit?: LocationCacheOmit<ExtArgs> | null
    /**
     * Filter, which LocationCaches to fetch.
     */
    where?: LocationCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationCaches to fetch.
     */
    orderBy?: LocationCacheOrderByWithRelationInput | LocationCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LocationCaches.
     */
    cursor?: LocationCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocationCaches.
     */
    distinct?: LocationCacheScalarFieldEnum | LocationCacheScalarFieldEnum[]
  }

  /**
   * LocationCache create
   */
  export type LocationCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCache
     */
    select?: LocationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationCache
     */
    omit?: LocationCacheOmit<ExtArgs> | null
    /**
     * The data needed to create a LocationCache.
     */
    data: XOR<LocationCacheCreateInput, LocationCacheUncheckedCreateInput>
  }

  /**
   * LocationCache createMany
   */
  export type LocationCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LocationCaches.
     */
    data: LocationCacheCreateManyInput | LocationCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LocationCache createManyAndReturn
   */
  export type LocationCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCache
     */
    select?: LocationCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LocationCache
     */
    omit?: LocationCacheOmit<ExtArgs> | null
    /**
     * The data used to create many LocationCaches.
     */
    data: LocationCacheCreateManyInput | LocationCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LocationCache update
   */
  export type LocationCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCache
     */
    select?: LocationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationCache
     */
    omit?: LocationCacheOmit<ExtArgs> | null
    /**
     * The data needed to update a LocationCache.
     */
    data: XOR<LocationCacheUpdateInput, LocationCacheUncheckedUpdateInput>
    /**
     * Choose, which LocationCache to update.
     */
    where: LocationCacheWhereUniqueInput
  }

  /**
   * LocationCache updateMany
   */
  export type LocationCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LocationCaches.
     */
    data: XOR<LocationCacheUpdateManyMutationInput, LocationCacheUncheckedUpdateManyInput>
    /**
     * Filter which LocationCaches to update
     */
    where?: LocationCacheWhereInput
    /**
     * Limit how many LocationCaches to update.
     */
    limit?: number
  }

  /**
   * LocationCache updateManyAndReturn
   */
  export type LocationCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCache
     */
    select?: LocationCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LocationCache
     */
    omit?: LocationCacheOmit<ExtArgs> | null
    /**
     * The data used to update LocationCaches.
     */
    data: XOR<LocationCacheUpdateManyMutationInput, LocationCacheUncheckedUpdateManyInput>
    /**
     * Filter which LocationCaches to update
     */
    where?: LocationCacheWhereInput
    /**
     * Limit how many LocationCaches to update.
     */
    limit?: number
  }

  /**
   * LocationCache upsert
   */
  export type LocationCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCache
     */
    select?: LocationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationCache
     */
    omit?: LocationCacheOmit<ExtArgs> | null
    /**
     * The filter to search for the LocationCache to update in case it exists.
     */
    where: LocationCacheWhereUniqueInput
    /**
     * In case the LocationCache found by the `where` argument doesn't exist, create a new LocationCache with this data.
     */
    create: XOR<LocationCacheCreateInput, LocationCacheUncheckedCreateInput>
    /**
     * In case the LocationCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationCacheUpdateInput, LocationCacheUncheckedUpdateInput>
  }

  /**
   * LocationCache delete
   */
  export type LocationCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCache
     */
    select?: LocationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationCache
     */
    omit?: LocationCacheOmit<ExtArgs> | null
    /**
     * Filter which LocationCache to delete.
     */
    where: LocationCacheWhereUniqueInput
  }

  /**
   * LocationCache deleteMany
   */
  export type LocationCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocationCaches to delete
     */
    where?: LocationCacheWhereInput
    /**
     * Limit how many LocationCaches to delete.
     */
    limit?: number
  }

  /**
   * LocationCache without action
   */
  export type LocationCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCache
     */
    select?: LocationCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocationCache
     */
    omit?: LocationCacheOmit<ExtArgs> | null
  }


  /**
   * Model Hotel
   */

  export type AggregateHotel = {
    _count: HotelCountAggregateOutputType | null
    _avg: HotelAvgAggregateOutputType | null
    _sum: HotelSumAggregateOutputType | null
    _min: HotelMinAggregateOutputType | null
    _max: HotelMaxAggregateOutputType | null
  }

  export type HotelAvgAggregateOutputType = {
    checkinDay: number | null
    checkoutDay: number | null
    rating: number | null
  }

  export type HotelSumAggregateOutputType = {
    checkinDay: number | null
    checkoutDay: number | null
    rating: number | null
  }

  export type HotelMinAggregateOutputType = {
    id: string | null
    tripId: string | null
    name: string | null
    address: string | null
    zone: string | null
    checkinDay: number | null
    checkoutDay: number | null
    checkinDate: Date | null
    checkoutDate: Date | null
    rating: number | null
    priceRange: string | null
    photoUrl: string | null
    googlePlaceId: string | null
    mapsUrl: string | null
    saved: boolean | null
  }

  export type HotelMaxAggregateOutputType = {
    id: string | null
    tripId: string | null
    name: string | null
    address: string | null
    zone: string | null
    checkinDay: number | null
    checkoutDay: number | null
    checkinDate: Date | null
    checkoutDate: Date | null
    rating: number | null
    priceRange: string | null
    photoUrl: string | null
    googlePlaceId: string | null
    mapsUrl: string | null
    saved: boolean | null
  }

  export type HotelCountAggregateOutputType = {
    id: number
    tripId: number
    name: number
    address: number
    zone: number
    checkinDay: number
    checkoutDay: number
    checkinDate: number
    checkoutDate: number
    rating: number
    priceRange: number
    photoUrl: number
    googlePlaceId: number
    mapsUrl: number
    saved: number
    _all: number
  }


  export type HotelAvgAggregateInputType = {
    checkinDay?: true
    checkoutDay?: true
    rating?: true
  }

  export type HotelSumAggregateInputType = {
    checkinDay?: true
    checkoutDay?: true
    rating?: true
  }

  export type HotelMinAggregateInputType = {
    id?: true
    tripId?: true
    name?: true
    address?: true
    zone?: true
    checkinDay?: true
    checkoutDay?: true
    checkinDate?: true
    checkoutDate?: true
    rating?: true
    priceRange?: true
    photoUrl?: true
    googlePlaceId?: true
    mapsUrl?: true
    saved?: true
  }

  export type HotelMaxAggregateInputType = {
    id?: true
    tripId?: true
    name?: true
    address?: true
    zone?: true
    checkinDay?: true
    checkoutDay?: true
    checkinDate?: true
    checkoutDate?: true
    rating?: true
    priceRange?: true
    photoUrl?: true
    googlePlaceId?: true
    mapsUrl?: true
    saved?: true
  }

  export type HotelCountAggregateInputType = {
    id?: true
    tripId?: true
    name?: true
    address?: true
    zone?: true
    checkinDay?: true
    checkoutDay?: true
    checkinDate?: true
    checkoutDate?: true
    rating?: true
    priceRange?: true
    photoUrl?: true
    googlePlaceId?: true
    mapsUrl?: true
    saved?: true
    _all?: true
  }

  export type HotelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hotel to aggregate.
     */
    where?: HotelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hotels to fetch.
     */
    orderBy?: HotelOrderByWithRelationInput | HotelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HotelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hotels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hotels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Hotels
    **/
    _count?: true | HotelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HotelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HotelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HotelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HotelMaxAggregateInputType
  }

  export type GetHotelAggregateType<T extends HotelAggregateArgs> = {
        [P in keyof T & keyof AggregateHotel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHotel[P]>
      : GetScalarType<T[P], AggregateHotel[P]>
  }




  export type HotelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HotelWhereInput
    orderBy?: HotelOrderByWithAggregationInput | HotelOrderByWithAggregationInput[]
    by: HotelScalarFieldEnum[] | HotelScalarFieldEnum
    having?: HotelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HotelCountAggregateInputType | true
    _avg?: HotelAvgAggregateInputType
    _sum?: HotelSumAggregateInputType
    _min?: HotelMinAggregateInputType
    _max?: HotelMaxAggregateInputType
  }

  export type HotelGroupByOutputType = {
    id: string
    tripId: string
    name: string
    address: string
    zone: string
    checkinDay: number
    checkoutDay: number
    checkinDate: Date
    checkoutDate: Date
    rating: number | null
    priceRange: string | null
    photoUrl: string | null
    googlePlaceId: string | null
    mapsUrl: string | null
    saved: boolean
    _count: HotelCountAggregateOutputType | null
    _avg: HotelAvgAggregateOutputType | null
    _sum: HotelSumAggregateOutputType | null
    _min: HotelMinAggregateOutputType | null
    _max: HotelMaxAggregateOutputType | null
  }

  type GetHotelGroupByPayload<T extends HotelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HotelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HotelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HotelGroupByOutputType[P]>
            : GetScalarType<T[P], HotelGroupByOutputType[P]>
        }
      >
    >


  export type HotelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    name?: boolean
    address?: boolean
    zone?: boolean
    checkinDay?: boolean
    checkoutDay?: boolean
    checkinDate?: boolean
    checkoutDate?: boolean
    rating?: boolean
    priceRange?: boolean
    photoUrl?: boolean
    googlePlaceId?: boolean
    mapsUrl?: boolean
    saved?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hotel"]>

  export type HotelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    name?: boolean
    address?: boolean
    zone?: boolean
    checkinDay?: boolean
    checkoutDay?: boolean
    checkinDate?: boolean
    checkoutDate?: boolean
    rating?: boolean
    priceRange?: boolean
    photoUrl?: boolean
    googlePlaceId?: boolean
    mapsUrl?: boolean
    saved?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hotel"]>

  export type HotelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    name?: boolean
    address?: boolean
    zone?: boolean
    checkinDay?: boolean
    checkoutDay?: boolean
    checkinDate?: boolean
    checkoutDate?: boolean
    rating?: boolean
    priceRange?: boolean
    photoUrl?: boolean
    googlePlaceId?: boolean
    mapsUrl?: boolean
    saved?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hotel"]>

  export type HotelSelectScalar = {
    id?: boolean
    tripId?: boolean
    name?: boolean
    address?: boolean
    zone?: boolean
    checkinDay?: boolean
    checkoutDay?: boolean
    checkinDate?: boolean
    checkoutDate?: boolean
    rating?: boolean
    priceRange?: boolean
    photoUrl?: boolean
    googlePlaceId?: boolean
    mapsUrl?: boolean
    saved?: boolean
  }

  export type HotelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tripId" | "name" | "address" | "zone" | "checkinDay" | "checkoutDay" | "checkinDate" | "checkoutDate" | "rating" | "priceRange" | "photoUrl" | "googlePlaceId" | "mapsUrl" | "saved", ExtArgs["result"]["hotel"]>
  export type HotelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }
  export type HotelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }
  export type HotelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }

  export type $HotelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Hotel"
    objects: {
      trip: Prisma.$TripPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tripId: string
      name: string
      address: string
      zone: string
      checkinDay: number
      checkoutDay: number
      checkinDate: Date
      checkoutDate: Date
      rating: number | null
      priceRange: string | null
      photoUrl: string | null
      googlePlaceId: string | null
      mapsUrl: string | null
      saved: boolean
    }, ExtArgs["result"]["hotel"]>
    composites: {}
  }

  type HotelGetPayload<S extends boolean | null | undefined | HotelDefaultArgs> = $Result.GetResult<Prisma.$HotelPayload, S>

  type HotelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HotelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HotelCountAggregateInputType | true
    }

  export interface HotelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Hotel'], meta: { name: 'Hotel' } }
    /**
     * Find zero or one Hotel that matches the filter.
     * @param {HotelFindUniqueArgs} args - Arguments to find a Hotel
     * @example
     * // Get one Hotel
     * const hotel = await prisma.hotel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HotelFindUniqueArgs>(args: SelectSubset<T, HotelFindUniqueArgs<ExtArgs>>): Prisma__HotelClient<$Result.GetResult<Prisma.$HotelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Hotel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HotelFindUniqueOrThrowArgs} args - Arguments to find a Hotel
     * @example
     * // Get one Hotel
     * const hotel = await prisma.hotel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HotelFindUniqueOrThrowArgs>(args: SelectSubset<T, HotelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HotelClient<$Result.GetResult<Prisma.$HotelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hotel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelFindFirstArgs} args - Arguments to find a Hotel
     * @example
     * // Get one Hotel
     * const hotel = await prisma.hotel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HotelFindFirstArgs>(args?: SelectSubset<T, HotelFindFirstArgs<ExtArgs>>): Prisma__HotelClient<$Result.GetResult<Prisma.$HotelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hotel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelFindFirstOrThrowArgs} args - Arguments to find a Hotel
     * @example
     * // Get one Hotel
     * const hotel = await prisma.hotel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HotelFindFirstOrThrowArgs>(args?: SelectSubset<T, HotelFindFirstOrThrowArgs<ExtArgs>>): Prisma__HotelClient<$Result.GetResult<Prisma.$HotelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Hotels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Hotels
     * const hotels = await prisma.hotel.findMany()
     * 
     * // Get first 10 Hotels
     * const hotels = await prisma.hotel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hotelWithIdOnly = await prisma.hotel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HotelFindManyArgs>(args?: SelectSubset<T, HotelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HotelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Hotel.
     * @param {HotelCreateArgs} args - Arguments to create a Hotel.
     * @example
     * // Create one Hotel
     * const Hotel = await prisma.hotel.create({
     *   data: {
     *     // ... data to create a Hotel
     *   }
     * })
     * 
     */
    create<T extends HotelCreateArgs>(args: SelectSubset<T, HotelCreateArgs<ExtArgs>>): Prisma__HotelClient<$Result.GetResult<Prisma.$HotelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Hotels.
     * @param {HotelCreateManyArgs} args - Arguments to create many Hotels.
     * @example
     * // Create many Hotels
     * const hotel = await prisma.hotel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HotelCreateManyArgs>(args?: SelectSubset<T, HotelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Hotels and returns the data saved in the database.
     * @param {HotelCreateManyAndReturnArgs} args - Arguments to create many Hotels.
     * @example
     * // Create many Hotels
     * const hotel = await prisma.hotel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Hotels and only return the `id`
     * const hotelWithIdOnly = await prisma.hotel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HotelCreateManyAndReturnArgs>(args?: SelectSubset<T, HotelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HotelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Hotel.
     * @param {HotelDeleteArgs} args - Arguments to delete one Hotel.
     * @example
     * // Delete one Hotel
     * const Hotel = await prisma.hotel.delete({
     *   where: {
     *     // ... filter to delete one Hotel
     *   }
     * })
     * 
     */
    delete<T extends HotelDeleteArgs>(args: SelectSubset<T, HotelDeleteArgs<ExtArgs>>): Prisma__HotelClient<$Result.GetResult<Prisma.$HotelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Hotel.
     * @param {HotelUpdateArgs} args - Arguments to update one Hotel.
     * @example
     * // Update one Hotel
     * const hotel = await prisma.hotel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HotelUpdateArgs>(args: SelectSubset<T, HotelUpdateArgs<ExtArgs>>): Prisma__HotelClient<$Result.GetResult<Prisma.$HotelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Hotels.
     * @param {HotelDeleteManyArgs} args - Arguments to filter Hotels to delete.
     * @example
     * // Delete a few Hotels
     * const { count } = await prisma.hotel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HotelDeleteManyArgs>(args?: SelectSubset<T, HotelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hotels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Hotels
     * const hotel = await prisma.hotel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HotelUpdateManyArgs>(args: SelectSubset<T, HotelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hotels and returns the data updated in the database.
     * @param {HotelUpdateManyAndReturnArgs} args - Arguments to update many Hotels.
     * @example
     * // Update many Hotels
     * const hotel = await prisma.hotel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Hotels and only return the `id`
     * const hotelWithIdOnly = await prisma.hotel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HotelUpdateManyAndReturnArgs>(args: SelectSubset<T, HotelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HotelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Hotel.
     * @param {HotelUpsertArgs} args - Arguments to update or create a Hotel.
     * @example
     * // Update or create a Hotel
     * const hotel = await prisma.hotel.upsert({
     *   create: {
     *     // ... data to create a Hotel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Hotel we want to update
     *   }
     * })
     */
    upsert<T extends HotelUpsertArgs>(args: SelectSubset<T, HotelUpsertArgs<ExtArgs>>): Prisma__HotelClient<$Result.GetResult<Prisma.$HotelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Hotels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelCountArgs} args - Arguments to filter Hotels to count.
     * @example
     * // Count the number of Hotels
     * const count = await prisma.hotel.count({
     *   where: {
     *     // ... the filter for the Hotels we want to count
     *   }
     * })
    **/
    count<T extends HotelCountArgs>(
      args?: Subset<T, HotelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HotelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Hotel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HotelAggregateArgs>(args: Subset<T, HotelAggregateArgs>): Prisma.PrismaPromise<GetHotelAggregateType<T>>

    /**
     * Group by Hotel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HotelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HotelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HotelGroupByArgs['orderBy'] }
        : { orderBy?: HotelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HotelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHotelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Hotel model
   */
  readonly fields: HotelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Hotel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HotelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trip<T extends TripDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TripDefaultArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Hotel model
   */
  interface HotelFieldRefs {
    readonly id: FieldRef<"Hotel", 'String'>
    readonly tripId: FieldRef<"Hotel", 'String'>
    readonly name: FieldRef<"Hotel", 'String'>
    readonly address: FieldRef<"Hotel", 'String'>
    readonly zone: FieldRef<"Hotel", 'String'>
    readonly checkinDay: FieldRef<"Hotel", 'Int'>
    readonly checkoutDay: FieldRef<"Hotel", 'Int'>
    readonly checkinDate: FieldRef<"Hotel", 'DateTime'>
    readonly checkoutDate: FieldRef<"Hotel", 'DateTime'>
    readonly rating: FieldRef<"Hotel", 'Float'>
    readonly priceRange: FieldRef<"Hotel", 'String'>
    readonly photoUrl: FieldRef<"Hotel", 'String'>
    readonly googlePlaceId: FieldRef<"Hotel", 'String'>
    readonly mapsUrl: FieldRef<"Hotel", 'String'>
    readonly saved: FieldRef<"Hotel", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Hotel findUnique
   */
  export type HotelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hotel
     */
    select?: HotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hotel
     */
    omit?: HotelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HotelInclude<ExtArgs> | null
    /**
     * Filter, which Hotel to fetch.
     */
    where: HotelWhereUniqueInput
  }

  /**
   * Hotel findUniqueOrThrow
   */
  export type HotelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hotel
     */
    select?: HotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hotel
     */
    omit?: HotelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HotelInclude<ExtArgs> | null
    /**
     * Filter, which Hotel to fetch.
     */
    where: HotelWhereUniqueInput
  }

  /**
   * Hotel findFirst
   */
  export type HotelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hotel
     */
    select?: HotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hotel
     */
    omit?: HotelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HotelInclude<ExtArgs> | null
    /**
     * Filter, which Hotel to fetch.
     */
    where?: HotelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hotels to fetch.
     */
    orderBy?: HotelOrderByWithRelationInput | HotelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hotels.
     */
    cursor?: HotelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hotels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hotels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hotels.
     */
    distinct?: HotelScalarFieldEnum | HotelScalarFieldEnum[]
  }

  /**
   * Hotel findFirstOrThrow
   */
  export type HotelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hotel
     */
    select?: HotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hotel
     */
    omit?: HotelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HotelInclude<ExtArgs> | null
    /**
     * Filter, which Hotel to fetch.
     */
    where?: HotelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hotels to fetch.
     */
    orderBy?: HotelOrderByWithRelationInput | HotelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hotels.
     */
    cursor?: HotelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hotels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hotels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hotels.
     */
    distinct?: HotelScalarFieldEnum | HotelScalarFieldEnum[]
  }

  /**
   * Hotel findMany
   */
  export type HotelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hotel
     */
    select?: HotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hotel
     */
    omit?: HotelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HotelInclude<ExtArgs> | null
    /**
     * Filter, which Hotels to fetch.
     */
    where?: HotelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hotels to fetch.
     */
    orderBy?: HotelOrderByWithRelationInput | HotelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Hotels.
     */
    cursor?: HotelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hotels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hotels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hotels.
     */
    distinct?: HotelScalarFieldEnum | HotelScalarFieldEnum[]
  }

  /**
   * Hotel create
   */
  export type HotelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hotel
     */
    select?: HotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hotel
     */
    omit?: HotelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HotelInclude<ExtArgs> | null
    /**
     * The data needed to create a Hotel.
     */
    data: XOR<HotelCreateInput, HotelUncheckedCreateInput>
  }

  /**
   * Hotel createMany
   */
  export type HotelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Hotels.
     */
    data: HotelCreateManyInput | HotelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hotel createManyAndReturn
   */
  export type HotelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hotel
     */
    select?: HotelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hotel
     */
    omit?: HotelOmit<ExtArgs> | null
    /**
     * The data used to create many Hotels.
     */
    data: HotelCreateManyInput | HotelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HotelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Hotel update
   */
  export type HotelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hotel
     */
    select?: HotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hotel
     */
    omit?: HotelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HotelInclude<ExtArgs> | null
    /**
     * The data needed to update a Hotel.
     */
    data: XOR<HotelUpdateInput, HotelUncheckedUpdateInput>
    /**
     * Choose, which Hotel to update.
     */
    where: HotelWhereUniqueInput
  }

  /**
   * Hotel updateMany
   */
  export type HotelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Hotels.
     */
    data: XOR<HotelUpdateManyMutationInput, HotelUncheckedUpdateManyInput>
    /**
     * Filter which Hotels to update
     */
    where?: HotelWhereInput
    /**
     * Limit how many Hotels to update.
     */
    limit?: number
  }

  /**
   * Hotel updateManyAndReturn
   */
  export type HotelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hotel
     */
    select?: HotelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hotel
     */
    omit?: HotelOmit<ExtArgs> | null
    /**
     * The data used to update Hotels.
     */
    data: XOR<HotelUpdateManyMutationInput, HotelUncheckedUpdateManyInput>
    /**
     * Filter which Hotels to update
     */
    where?: HotelWhereInput
    /**
     * Limit how many Hotels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HotelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Hotel upsert
   */
  export type HotelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hotel
     */
    select?: HotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hotel
     */
    omit?: HotelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HotelInclude<ExtArgs> | null
    /**
     * The filter to search for the Hotel to update in case it exists.
     */
    where: HotelWhereUniqueInput
    /**
     * In case the Hotel found by the `where` argument doesn't exist, create a new Hotel with this data.
     */
    create: XOR<HotelCreateInput, HotelUncheckedCreateInput>
    /**
     * In case the Hotel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HotelUpdateInput, HotelUncheckedUpdateInput>
  }

  /**
   * Hotel delete
   */
  export type HotelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hotel
     */
    select?: HotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hotel
     */
    omit?: HotelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HotelInclude<ExtArgs> | null
    /**
     * Filter which Hotel to delete.
     */
    where: HotelWhereUniqueInput
  }

  /**
   * Hotel deleteMany
   */
  export type HotelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hotels to delete
     */
    where?: HotelWhereInput
    /**
     * Limit how many Hotels to delete.
     */
    limit?: number
  }

  /**
   * Hotel without action
   */
  export type HotelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hotel
     */
    select?: HotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hotel
     */
    omit?: HotelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HotelInclude<ExtArgs> | null
  }


  /**
   * Model TripMessage
   */

  export type AggregateTripMessage = {
    _count: TripMessageCountAggregateOutputType | null
    _min: TripMessageMinAggregateOutputType | null
    _max: TripMessageMaxAggregateOutputType | null
  }

  export type TripMessageMinAggregateOutputType = {
    id: string | null
    tripId: string | null
    userId: string | null
    userName: string | null
    content: string | null
    createdAt: Date | null
  }

  export type TripMessageMaxAggregateOutputType = {
    id: string | null
    tripId: string | null
    userId: string | null
    userName: string | null
    content: string | null
    createdAt: Date | null
  }

  export type TripMessageCountAggregateOutputType = {
    id: number
    tripId: number
    userId: number
    userName: number
    content: number
    createdAt: number
    _all: number
  }


  export type TripMessageMinAggregateInputType = {
    id?: true
    tripId?: true
    userId?: true
    userName?: true
    content?: true
    createdAt?: true
  }

  export type TripMessageMaxAggregateInputType = {
    id?: true
    tripId?: true
    userId?: true
    userName?: true
    content?: true
    createdAt?: true
  }

  export type TripMessageCountAggregateInputType = {
    id?: true
    tripId?: true
    userId?: true
    userName?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type TripMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TripMessage to aggregate.
     */
    where?: TripMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripMessages to fetch.
     */
    orderBy?: TripMessageOrderByWithRelationInput | TripMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TripMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TripMessages
    **/
    _count?: true | TripMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TripMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TripMessageMaxAggregateInputType
  }

  export type GetTripMessageAggregateType<T extends TripMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateTripMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTripMessage[P]>
      : GetScalarType<T[P], AggregateTripMessage[P]>
  }




  export type TripMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TripMessageWhereInput
    orderBy?: TripMessageOrderByWithAggregationInput | TripMessageOrderByWithAggregationInput[]
    by: TripMessageScalarFieldEnum[] | TripMessageScalarFieldEnum
    having?: TripMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TripMessageCountAggregateInputType | true
    _min?: TripMessageMinAggregateInputType
    _max?: TripMessageMaxAggregateInputType
  }

  export type TripMessageGroupByOutputType = {
    id: string
    tripId: string
    userId: string
    userName: string
    content: string
    createdAt: Date
    _count: TripMessageCountAggregateOutputType | null
    _min: TripMessageMinAggregateOutputType | null
    _max: TripMessageMaxAggregateOutputType | null
  }

  type GetTripMessageGroupByPayload<T extends TripMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TripMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TripMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TripMessageGroupByOutputType[P]>
            : GetScalarType<T[P], TripMessageGroupByOutputType[P]>
        }
      >
    >


  export type TripMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    userId?: boolean
    userName?: boolean
    content?: boolean
    createdAt?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tripMessage"]>

  export type TripMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    userId?: boolean
    userName?: boolean
    content?: boolean
    createdAt?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tripMessage"]>

  export type TripMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tripId?: boolean
    userId?: boolean
    userName?: boolean
    content?: boolean
    createdAt?: boolean
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tripMessage"]>

  export type TripMessageSelectScalar = {
    id?: boolean
    tripId?: boolean
    userId?: boolean
    userName?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type TripMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tripId" | "userId" | "userName" | "content" | "createdAt", ExtArgs["result"]["tripMessage"]>
  export type TripMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }
  export type TripMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }
  export type TripMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trip?: boolean | TripDefaultArgs<ExtArgs>
  }

  export type $TripMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TripMessage"
    objects: {
      trip: Prisma.$TripPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tripId: string
      userId: string
      userName: string
      content: string
      createdAt: Date
    }, ExtArgs["result"]["tripMessage"]>
    composites: {}
  }

  type TripMessageGetPayload<S extends boolean | null | undefined | TripMessageDefaultArgs> = $Result.GetResult<Prisma.$TripMessagePayload, S>

  type TripMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TripMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TripMessageCountAggregateInputType | true
    }

  export interface TripMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TripMessage'], meta: { name: 'TripMessage' } }
    /**
     * Find zero or one TripMessage that matches the filter.
     * @param {TripMessageFindUniqueArgs} args - Arguments to find a TripMessage
     * @example
     * // Get one TripMessage
     * const tripMessage = await prisma.tripMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TripMessageFindUniqueArgs>(args: SelectSubset<T, TripMessageFindUniqueArgs<ExtArgs>>): Prisma__TripMessageClient<$Result.GetResult<Prisma.$TripMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TripMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TripMessageFindUniqueOrThrowArgs} args - Arguments to find a TripMessage
     * @example
     * // Get one TripMessage
     * const tripMessage = await prisma.tripMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TripMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, TripMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TripMessageClient<$Result.GetResult<Prisma.$TripMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TripMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripMessageFindFirstArgs} args - Arguments to find a TripMessage
     * @example
     * // Get one TripMessage
     * const tripMessage = await prisma.tripMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TripMessageFindFirstArgs>(args?: SelectSubset<T, TripMessageFindFirstArgs<ExtArgs>>): Prisma__TripMessageClient<$Result.GetResult<Prisma.$TripMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TripMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripMessageFindFirstOrThrowArgs} args - Arguments to find a TripMessage
     * @example
     * // Get one TripMessage
     * const tripMessage = await prisma.tripMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TripMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, TripMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__TripMessageClient<$Result.GetResult<Prisma.$TripMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TripMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TripMessages
     * const tripMessages = await prisma.tripMessage.findMany()
     * 
     * // Get first 10 TripMessages
     * const tripMessages = await prisma.tripMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tripMessageWithIdOnly = await prisma.tripMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TripMessageFindManyArgs>(args?: SelectSubset<T, TripMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TripMessage.
     * @param {TripMessageCreateArgs} args - Arguments to create a TripMessage.
     * @example
     * // Create one TripMessage
     * const TripMessage = await prisma.tripMessage.create({
     *   data: {
     *     // ... data to create a TripMessage
     *   }
     * })
     * 
     */
    create<T extends TripMessageCreateArgs>(args: SelectSubset<T, TripMessageCreateArgs<ExtArgs>>): Prisma__TripMessageClient<$Result.GetResult<Prisma.$TripMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TripMessages.
     * @param {TripMessageCreateManyArgs} args - Arguments to create many TripMessages.
     * @example
     * // Create many TripMessages
     * const tripMessage = await prisma.tripMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TripMessageCreateManyArgs>(args?: SelectSubset<T, TripMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TripMessages and returns the data saved in the database.
     * @param {TripMessageCreateManyAndReturnArgs} args - Arguments to create many TripMessages.
     * @example
     * // Create many TripMessages
     * const tripMessage = await prisma.tripMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TripMessages and only return the `id`
     * const tripMessageWithIdOnly = await prisma.tripMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TripMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, TripMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TripMessage.
     * @param {TripMessageDeleteArgs} args - Arguments to delete one TripMessage.
     * @example
     * // Delete one TripMessage
     * const TripMessage = await prisma.tripMessage.delete({
     *   where: {
     *     // ... filter to delete one TripMessage
     *   }
     * })
     * 
     */
    delete<T extends TripMessageDeleteArgs>(args: SelectSubset<T, TripMessageDeleteArgs<ExtArgs>>): Prisma__TripMessageClient<$Result.GetResult<Prisma.$TripMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TripMessage.
     * @param {TripMessageUpdateArgs} args - Arguments to update one TripMessage.
     * @example
     * // Update one TripMessage
     * const tripMessage = await prisma.tripMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TripMessageUpdateArgs>(args: SelectSubset<T, TripMessageUpdateArgs<ExtArgs>>): Prisma__TripMessageClient<$Result.GetResult<Prisma.$TripMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TripMessages.
     * @param {TripMessageDeleteManyArgs} args - Arguments to filter TripMessages to delete.
     * @example
     * // Delete a few TripMessages
     * const { count } = await prisma.tripMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TripMessageDeleteManyArgs>(args?: SelectSubset<T, TripMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TripMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TripMessages
     * const tripMessage = await prisma.tripMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TripMessageUpdateManyArgs>(args: SelectSubset<T, TripMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TripMessages and returns the data updated in the database.
     * @param {TripMessageUpdateManyAndReturnArgs} args - Arguments to update many TripMessages.
     * @example
     * // Update many TripMessages
     * const tripMessage = await prisma.tripMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TripMessages and only return the `id`
     * const tripMessageWithIdOnly = await prisma.tripMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TripMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, TripMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TripMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TripMessage.
     * @param {TripMessageUpsertArgs} args - Arguments to update or create a TripMessage.
     * @example
     * // Update or create a TripMessage
     * const tripMessage = await prisma.tripMessage.upsert({
     *   create: {
     *     // ... data to create a TripMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TripMessage we want to update
     *   }
     * })
     */
    upsert<T extends TripMessageUpsertArgs>(args: SelectSubset<T, TripMessageUpsertArgs<ExtArgs>>): Prisma__TripMessageClient<$Result.GetResult<Prisma.$TripMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TripMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripMessageCountArgs} args - Arguments to filter TripMessages to count.
     * @example
     * // Count the number of TripMessages
     * const count = await prisma.tripMessage.count({
     *   where: {
     *     // ... the filter for the TripMessages we want to count
     *   }
     * })
    **/
    count<T extends TripMessageCountArgs>(
      args?: Subset<T, TripMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TripMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TripMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TripMessageAggregateArgs>(args: Subset<T, TripMessageAggregateArgs>): Prisma.PrismaPromise<GetTripMessageAggregateType<T>>

    /**
     * Group by TripMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TripMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TripMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TripMessageGroupByArgs['orderBy'] }
        : { orderBy?: TripMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TripMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTripMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TripMessage model
   */
  readonly fields: TripMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TripMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TripMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trip<T extends TripDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TripDefaultArgs<ExtArgs>>): Prisma__TripClient<$Result.GetResult<Prisma.$TripPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TripMessage model
   */
  interface TripMessageFieldRefs {
    readonly id: FieldRef<"TripMessage", 'String'>
    readonly tripId: FieldRef<"TripMessage", 'String'>
    readonly userId: FieldRef<"TripMessage", 'String'>
    readonly userName: FieldRef<"TripMessage", 'String'>
    readonly content: FieldRef<"TripMessage", 'String'>
    readonly createdAt: FieldRef<"TripMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TripMessage findUnique
   */
  export type TripMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripMessage
     */
    select?: TripMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripMessage
     */
    omit?: TripMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripMessageInclude<ExtArgs> | null
    /**
     * Filter, which TripMessage to fetch.
     */
    where: TripMessageWhereUniqueInput
  }

  /**
   * TripMessage findUniqueOrThrow
   */
  export type TripMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripMessage
     */
    select?: TripMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripMessage
     */
    omit?: TripMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripMessageInclude<ExtArgs> | null
    /**
     * Filter, which TripMessage to fetch.
     */
    where: TripMessageWhereUniqueInput
  }

  /**
   * TripMessage findFirst
   */
  export type TripMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripMessage
     */
    select?: TripMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripMessage
     */
    omit?: TripMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripMessageInclude<ExtArgs> | null
    /**
     * Filter, which TripMessage to fetch.
     */
    where?: TripMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripMessages to fetch.
     */
    orderBy?: TripMessageOrderByWithRelationInput | TripMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TripMessages.
     */
    cursor?: TripMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TripMessages.
     */
    distinct?: TripMessageScalarFieldEnum | TripMessageScalarFieldEnum[]
  }

  /**
   * TripMessage findFirstOrThrow
   */
  export type TripMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripMessage
     */
    select?: TripMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripMessage
     */
    omit?: TripMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripMessageInclude<ExtArgs> | null
    /**
     * Filter, which TripMessage to fetch.
     */
    where?: TripMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripMessages to fetch.
     */
    orderBy?: TripMessageOrderByWithRelationInput | TripMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TripMessages.
     */
    cursor?: TripMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TripMessages.
     */
    distinct?: TripMessageScalarFieldEnum | TripMessageScalarFieldEnum[]
  }

  /**
   * TripMessage findMany
   */
  export type TripMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripMessage
     */
    select?: TripMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripMessage
     */
    omit?: TripMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripMessageInclude<ExtArgs> | null
    /**
     * Filter, which TripMessages to fetch.
     */
    where?: TripMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TripMessages to fetch.
     */
    orderBy?: TripMessageOrderByWithRelationInput | TripMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TripMessages.
     */
    cursor?: TripMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TripMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TripMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TripMessages.
     */
    distinct?: TripMessageScalarFieldEnum | TripMessageScalarFieldEnum[]
  }

  /**
   * TripMessage create
   */
  export type TripMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripMessage
     */
    select?: TripMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripMessage
     */
    omit?: TripMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a TripMessage.
     */
    data: XOR<TripMessageCreateInput, TripMessageUncheckedCreateInput>
  }

  /**
   * TripMessage createMany
   */
  export type TripMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TripMessages.
     */
    data: TripMessageCreateManyInput | TripMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TripMessage createManyAndReturn
   */
  export type TripMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripMessage
     */
    select?: TripMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TripMessage
     */
    omit?: TripMessageOmit<ExtArgs> | null
    /**
     * The data used to create many TripMessages.
     */
    data: TripMessageCreateManyInput | TripMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TripMessage update
   */
  export type TripMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripMessage
     */
    select?: TripMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripMessage
     */
    omit?: TripMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a TripMessage.
     */
    data: XOR<TripMessageUpdateInput, TripMessageUncheckedUpdateInput>
    /**
     * Choose, which TripMessage to update.
     */
    where: TripMessageWhereUniqueInput
  }

  /**
   * TripMessage updateMany
   */
  export type TripMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TripMessages.
     */
    data: XOR<TripMessageUpdateManyMutationInput, TripMessageUncheckedUpdateManyInput>
    /**
     * Filter which TripMessages to update
     */
    where?: TripMessageWhereInput
    /**
     * Limit how many TripMessages to update.
     */
    limit?: number
  }

  /**
   * TripMessage updateManyAndReturn
   */
  export type TripMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripMessage
     */
    select?: TripMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TripMessage
     */
    omit?: TripMessageOmit<ExtArgs> | null
    /**
     * The data used to update TripMessages.
     */
    data: XOR<TripMessageUpdateManyMutationInput, TripMessageUncheckedUpdateManyInput>
    /**
     * Filter which TripMessages to update
     */
    where?: TripMessageWhereInput
    /**
     * Limit how many TripMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TripMessage upsert
   */
  export type TripMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripMessage
     */
    select?: TripMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripMessage
     */
    omit?: TripMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the TripMessage to update in case it exists.
     */
    where: TripMessageWhereUniqueInput
    /**
     * In case the TripMessage found by the `where` argument doesn't exist, create a new TripMessage with this data.
     */
    create: XOR<TripMessageCreateInput, TripMessageUncheckedCreateInput>
    /**
     * In case the TripMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TripMessageUpdateInput, TripMessageUncheckedUpdateInput>
  }

  /**
   * TripMessage delete
   */
  export type TripMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripMessage
     */
    select?: TripMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripMessage
     */
    omit?: TripMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripMessageInclude<ExtArgs> | null
    /**
     * Filter which TripMessage to delete.
     */
    where: TripMessageWhereUniqueInput
  }

  /**
   * TripMessage deleteMany
   */
  export type TripMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TripMessages to delete
     */
    where?: TripMessageWhereInput
    /**
     * Limit how many TripMessages to delete.
     */
    limit?: number
  }

  /**
   * TripMessage without action
   */
  export type TripMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TripMessage
     */
    select?: TripMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TripMessage
     */
    omit?: TripMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TripMessageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    travelStyle: 'travelStyle',
    pace: 'pace',
    budgetRange: 'budgetRange',
    currency: 'currency',
    distanceUnit: 'distanceUnit',
    theme: 'theme',
    emailAlerts: 'emailAlerts',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TripScalarFieldEnum: {
    id: 'id',
    name: 'name',
    destination: 'destination',
    startDate: 'startDate',
    endDate: 'endDate',
    travelers: 'travelers',
    originCity: 'originCity',
    transportMode: 'transportMode',
    estimatedTravelHours: 'estimatedTravelHours',
    createdAt: 'createdAt',
    shareToken: 'shareToken',
    tripCode: 'tripCode',
    dailySummaries: 'dailySummaries'
  };

  export type TripScalarFieldEnum = (typeof TripScalarFieldEnum)[keyof typeof TripScalarFieldEnum]


  export const CollaboratorScalarFieldEnum: {
    id: 'id',
    tripId: 'tripId',
    userId: 'userId',
    role: 'role'
  };

  export type CollaboratorScalarFieldEnum = (typeof CollaboratorScalarFieldEnum)[keyof typeof CollaboratorScalarFieldEnum]


  export const ItineraryItemScalarFieldEnum: {
    id: 'id',
    tripId: 'tripId',
    day: 'day',
    position: 'position',
    type: 'type',
    time: 'time',
    activity: 'activity',
    location: 'location',
    lat: 'lat',
    lng: 'lng',
    durationMinutes: 'durationMinutes',
    estimatedCost: 'estimatedCost',
    category: 'category',
    notes: 'notes',
    travelTimeFromPrevious: 'travelTimeFromPrevious',
    hasTimingConflict: 'hasTimingConflict',
    createdAt: 'createdAt'
  };

  export type ItineraryItemScalarFieldEnum = (typeof ItineraryItemScalarFieldEnum)[keyof typeof ItineraryItemScalarFieldEnum]


  export const LocationCacheScalarFieldEnum: {
    id: 'id',
    origin: 'origin',
    destination: 'destination',
    travelMinutes: 'travelMinutes',
    cachedAt: 'cachedAt'
  };

  export type LocationCacheScalarFieldEnum = (typeof LocationCacheScalarFieldEnum)[keyof typeof LocationCacheScalarFieldEnum]


  export const HotelScalarFieldEnum: {
    id: 'id',
    tripId: 'tripId',
    name: 'name',
    address: 'address',
    zone: 'zone',
    checkinDay: 'checkinDay',
    checkoutDay: 'checkoutDay',
    checkinDate: 'checkinDate',
    checkoutDate: 'checkoutDate',
    rating: 'rating',
    priceRange: 'priceRange',
    photoUrl: 'photoUrl',
    googlePlaceId: 'googlePlaceId',
    mapsUrl: 'mapsUrl',
    saved: 'saved'
  };

  export type HotelScalarFieldEnum = (typeof HotelScalarFieldEnum)[keyof typeof HotelScalarFieldEnum]


  export const TripMessageScalarFieldEnum: {
    id: 'id',
    tripId: 'tripId',
    userId: 'userId',
    userName: 'userName',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type TripMessageScalarFieldEnum = (typeof TripMessageScalarFieldEnum)[keyof typeof TripMessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    travelStyle?: StringFilter<"User"> | string
    pace?: StringFilter<"User"> | string
    budgetRange?: StringFilter<"User"> | string
    currency?: StringFilter<"User"> | string
    distanceUnit?: StringFilter<"User"> | string
    theme?: StringFilter<"User"> | string
    emailAlerts?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    trips?: CollaboratorListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    travelStyle?: SortOrder
    pace?: SortOrder
    budgetRange?: SortOrder
    currency?: SortOrder
    distanceUnit?: SortOrder
    theme?: SortOrder
    emailAlerts?: SortOrder
    createdAt?: SortOrder
    trips?: CollaboratorOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    travelStyle?: StringFilter<"User"> | string
    pace?: StringFilter<"User"> | string
    budgetRange?: StringFilter<"User"> | string
    currency?: StringFilter<"User"> | string
    distanceUnit?: StringFilter<"User"> | string
    theme?: StringFilter<"User"> | string
    emailAlerts?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    trips?: CollaboratorListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    travelStyle?: SortOrder
    pace?: SortOrder
    budgetRange?: SortOrder
    currency?: SortOrder
    distanceUnit?: SortOrder
    theme?: SortOrder
    emailAlerts?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    travelStyle?: StringWithAggregatesFilter<"User"> | string
    pace?: StringWithAggregatesFilter<"User"> | string
    budgetRange?: StringWithAggregatesFilter<"User"> | string
    currency?: StringWithAggregatesFilter<"User"> | string
    distanceUnit?: StringWithAggregatesFilter<"User"> | string
    theme?: StringWithAggregatesFilter<"User"> | string
    emailAlerts?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TripWhereInput = {
    AND?: TripWhereInput | TripWhereInput[]
    OR?: TripWhereInput[]
    NOT?: TripWhereInput | TripWhereInput[]
    id?: StringFilter<"Trip"> | string
    name?: StringFilter<"Trip"> | string
    destination?: StringFilter<"Trip"> | string
    startDate?: DateTimeFilter<"Trip"> | Date | string
    endDate?: DateTimeFilter<"Trip"> | Date | string
    travelers?: IntFilter<"Trip"> | number
    originCity?: StringFilter<"Trip"> | string
    transportMode?: StringFilter<"Trip"> | string
    estimatedTravelHours?: FloatFilter<"Trip"> | number
    createdAt?: DateTimeFilter<"Trip"> | Date | string
    shareToken?: StringFilter<"Trip"> | string
    tripCode?: StringNullableFilter<"Trip"> | string | null
    dailySummaries?: JsonNullableFilter<"Trip">
    collaborators?: CollaboratorListRelationFilter
    items?: ItineraryItemListRelationFilter
    hotels?: HotelListRelationFilter
    messages?: TripMessageListRelationFilter
  }

  export type TripOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    destination?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    travelers?: SortOrder
    originCity?: SortOrder
    transportMode?: SortOrder
    estimatedTravelHours?: SortOrder
    createdAt?: SortOrder
    shareToken?: SortOrder
    tripCode?: SortOrderInput | SortOrder
    dailySummaries?: SortOrderInput | SortOrder
    collaborators?: CollaboratorOrderByRelationAggregateInput
    items?: ItineraryItemOrderByRelationAggregateInput
    hotels?: HotelOrderByRelationAggregateInput
    messages?: TripMessageOrderByRelationAggregateInput
  }

  export type TripWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shareToken?: string
    tripCode?: string
    AND?: TripWhereInput | TripWhereInput[]
    OR?: TripWhereInput[]
    NOT?: TripWhereInput | TripWhereInput[]
    name?: StringFilter<"Trip"> | string
    destination?: StringFilter<"Trip"> | string
    startDate?: DateTimeFilter<"Trip"> | Date | string
    endDate?: DateTimeFilter<"Trip"> | Date | string
    travelers?: IntFilter<"Trip"> | number
    originCity?: StringFilter<"Trip"> | string
    transportMode?: StringFilter<"Trip"> | string
    estimatedTravelHours?: FloatFilter<"Trip"> | number
    createdAt?: DateTimeFilter<"Trip"> | Date | string
    dailySummaries?: JsonNullableFilter<"Trip">
    collaborators?: CollaboratorListRelationFilter
    items?: ItineraryItemListRelationFilter
    hotels?: HotelListRelationFilter
    messages?: TripMessageListRelationFilter
  }, "id" | "shareToken" | "tripCode">

  export type TripOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    destination?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    travelers?: SortOrder
    originCity?: SortOrder
    transportMode?: SortOrder
    estimatedTravelHours?: SortOrder
    createdAt?: SortOrder
    shareToken?: SortOrder
    tripCode?: SortOrderInput | SortOrder
    dailySummaries?: SortOrderInput | SortOrder
    _count?: TripCountOrderByAggregateInput
    _avg?: TripAvgOrderByAggregateInput
    _max?: TripMaxOrderByAggregateInput
    _min?: TripMinOrderByAggregateInput
    _sum?: TripSumOrderByAggregateInput
  }

  export type TripScalarWhereWithAggregatesInput = {
    AND?: TripScalarWhereWithAggregatesInput | TripScalarWhereWithAggregatesInput[]
    OR?: TripScalarWhereWithAggregatesInput[]
    NOT?: TripScalarWhereWithAggregatesInput | TripScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Trip"> | string
    name?: StringWithAggregatesFilter<"Trip"> | string
    destination?: StringWithAggregatesFilter<"Trip"> | string
    startDate?: DateTimeWithAggregatesFilter<"Trip"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Trip"> | Date | string
    travelers?: IntWithAggregatesFilter<"Trip"> | number
    originCity?: StringWithAggregatesFilter<"Trip"> | string
    transportMode?: StringWithAggregatesFilter<"Trip"> | string
    estimatedTravelHours?: FloatWithAggregatesFilter<"Trip"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Trip"> | Date | string
    shareToken?: StringWithAggregatesFilter<"Trip"> | string
    tripCode?: StringNullableWithAggregatesFilter<"Trip"> | string | null
    dailySummaries?: JsonNullableWithAggregatesFilter<"Trip">
  }

  export type CollaboratorWhereInput = {
    AND?: CollaboratorWhereInput | CollaboratorWhereInput[]
    OR?: CollaboratorWhereInput[]
    NOT?: CollaboratorWhereInput | CollaboratorWhereInput[]
    id?: StringFilter<"Collaborator"> | string
    tripId?: StringFilter<"Collaborator"> | string
    userId?: StringFilter<"Collaborator"> | string
    role?: StringFilter<"Collaborator"> | string
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CollaboratorOrderByWithRelationInput = {
    id?: SortOrder
    tripId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    trip?: TripOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type CollaboratorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tripId_userId?: CollaboratorTripIdUserIdCompoundUniqueInput
    AND?: CollaboratorWhereInput | CollaboratorWhereInput[]
    OR?: CollaboratorWhereInput[]
    NOT?: CollaboratorWhereInput | CollaboratorWhereInput[]
    tripId?: StringFilter<"Collaborator"> | string
    userId?: StringFilter<"Collaborator"> | string
    role?: StringFilter<"Collaborator"> | string
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "tripId_userId">

  export type CollaboratorOrderByWithAggregationInput = {
    id?: SortOrder
    tripId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    _count?: CollaboratorCountOrderByAggregateInput
    _max?: CollaboratorMaxOrderByAggregateInput
    _min?: CollaboratorMinOrderByAggregateInput
  }

  export type CollaboratorScalarWhereWithAggregatesInput = {
    AND?: CollaboratorScalarWhereWithAggregatesInput | CollaboratorScalarWhereWithAggregatesInput[]
    OR?: CollaboratorScalarWhereWithAggregatesInput[]
    NOT?: CollaboratorScalarWhereWithAggregatesInput | CollaboratorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Collaborator"> | string
    tripId?: StringWithAggregatesFilter<"Collaborator"> | string
    userId?: StringWithAggregatesFilter<"Collaborator"> | string
    role?: StringWithAggregatesFilter<"Collaborator"> | string
  }

  export type ItineraryItemWhereInput = {
    AND?: ItineraryItemWhereInput | ItineraryItemWhereInput[]
    OR?: ItineraryItemWhereInput[]
    NOT?: ItineraryItemWhereInput | ItineraryItemWhereInput[]
    id?: StringFilter<"ItineraryItem"> | string
    tripId?: StringFilter<"ItineraryItem"> | string
    day?: IntFilter<"ItineraryItem"> | number
    position?: FloatFilter<"ItineraryItem"> | number
    type?: StringFilter<"ItineraryItem"> | string
    time?: StringFilter<"ItineraryItem"> | string
    activity?: StringFilter<"ItineraryItem"> | string
    location?: StringFilter<"ItineraryItem"> | string
    lat?: FloatNullableFilter<"ItineraryItem"> | number | null
    lng?: FloatNullableFilter<"ItineraryItem"> | number | null
    durationMinutes?: IntFilter<"ItineraryItem"> | number
    estimatedCost?: IntFilter<"ItineraryItem"> | number
    category?: StringFilter<"ItineraryItem"> | string
    notes?: StringNullableFilter<"ItineraryItem"> | string | null
    travelTimeFromPrevious?: IntNullableFilter<"ItineraryItem"> | number | null
    hasTimingConflict?: BoolFilter<"ItineraryItem"> | boolean
    createdAt?: DateTimeFilter<"ItineraryItem"> | Date | string
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
  }

  export type ItineraryItemOrderByWithRelationInput = {
    id?: SortOrder
    tripId?: SortOrder
    day?: SortOrder
    position?: SortOrder
    type?: SortOrder
    time?: SortOrder
    activity?: SortOrder
    location?: SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    durationMinutes?: SortOrder
    estimatedCost?: SortOrder
    category?: SortOrder
    notes?: SortOrderInput | SortOrder
    travelTimeFromPrevious?: SortOrderInput | SortOrder
    hasTimingConflict?: SortOrder
    createdAt?: SortOrder
    trip?: TripOrderByWithRelationInput
  }

  export type ItineraryItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ItineraryItemWhereInput | ItineraryItemWhereInput[]
    OR?: ItineraryItemWhereInput[]
    NOT?: ItineraryItemWhereInput | ItineraryItemWhereInput[]
    tripId?: StringFilter<"ItineraryItem"> | string
    day?: IntFilter<"ItineraryItem"> | number
    position?: FloatFilter<"ItineraryItem"> | number
    type?: StringFilter<"ItineraryItem"> | string
    time?: StringFilter<"ItineraryItem"> | string
    activity?: StringFilter<"ItineraryItem"> | string
    location?: StringFilter<"ItineraryItem"> | string
    lat?: FloatNullableFilter<"ItineraryItem"> | number | null
    lng?: FloatNullableFilter<"ItineraryItem"> | number | null
    durationMinutes?: IntFilter<"ItineraryItem"> | number
    estimatedCost?: IntFilter<"ItineraryItem"> | number
    category?: StringFilter<"ItineraryItem"> | string
    notes?: StringNullableFilter<"ItineraryItem"> | string | null
    travelTimeFromPrevious?: IntNullableFilter<"ItineraryItem"> | number | null
    hasTimingConflict?: BoolFilter<"ItineraryItem"> | boolean
    createdAt?: DateTimeFilter<"ItineraryItem"> | Date | string
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
  }, "id">

  export type ItineraryItemOrderByWithAggregationInput = {
    id?: SortOrder
    tripId?: SortOrder
    day?: SortOrder
    position?: SortOrder
    type?: SortOrder
    time?: SortOrder
    activity?: SortOrder
    location?: SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    durationMinutes?: SortOrder
    estimatedCost?: SortOrder
    category?: SortOrder
    notes?: SortOrderInput | SortOrder
    travelTimeFromPrevious?: SortOrderInput | SortOrder
    hasTimingConflict?: SortOrder
    createdAt?: SortOrder
    _count?: ItineraryItemCountOrderByAggregateInput
    _avg?: ItineraryItemAvgOrderByAggregateInput
    _max?: ItineraryItemMaxOrderByAggregateInput
    _min?: ItineraryItemMinOrderByAggregateInput
    _sum?: ItineraryItemSumOrderByAggregateInput
  }

  export type ItineraryItemScalarWhereWithAggregatesInput = {
    AND?: ItineraryItemScalarWhereWithAggregatesInput | ItineraryItemScalarWhereWithAggregatesInput[]
    OR?: ItineraryItemScalarWhereWithAggregatesInput[]
    NOT?: ItineraryItemScalarWhereWithAggregatesInput | ItineraryItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ItineraryItem"> | string
    tripId?: StringWithAggregatesFilter<"ItineraryItem"> | string
    day?: IntWithAggregatesFilter<"ItineraryItem"> | number
    position?: FloatWithAggregatesFilter<"ItineraryItem"> | number
    type?: StringWithAggregatesFilter<"ItineraryItem"> | string
    time?: StringWithAggregatesFilter<"ItineraryItem"> | string
    activity?: StringWithAggregatesFilter<"ItineraryItem"> | string
    location?: StringWithAggregatesFilter<"ItineraryItem"> | string
    lat?: FloatNullableWithAggregatesFilter<"ItineraryItem"> | number | null
    lng?: FloatNullableWithAggregatesFilter<"ItineraryItem"> | number | null
    durationMinutes?: IntWithAggregatesFilter<"ItineraryItem"> | number
    estimatedCost?: IntWithAggregatesFilter<"ItineraryItem"> | number
    category?: StringWithAggregatesFilter<"ItineraryItem"> | string
    notes?: StringNullableWithAggregatesFilter<"ItineraryItem"> | string | null
    travelTimeFromPrevious?: IntNullableWithAggregatesFilter<"ItineraryItem"> | number | null
    hasTimingConflict?: BoolWithAggregatesFilter<"ItineraryItem"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ItineraryItem"> | Date | string
  }

  export type LocationCacheWhereInput = {
    AND?: LocationCacheWhereInput | LocationCacheWhereInput[]
    OR?: LocationCacheWhereInput[]
    NOT?: LocationCacheWhereInput | LocationCacheWhereInput[]
    id?: StringFilter<"LocationCache"> | string
    origin?: StringFilter<"LocationCache"> | string
    destination?: StringFilter<"LocationCache"> | string
    travelMinutes?: IntFilter<"LocationCache"> | number
    cachedAt?: DateTimeFilter<"LocationCache"> | Date | string
  }

  export type LocationCacheOrderByWithRelationInput = {
    id?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    travelMinutes?: SortOrder
    cachedAt?: SortOrder
  }

  export type LocationCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    origin_destination?: LocationCacheOriginDestinationCompoundUniqueInput
    AND?: LocationCacheWhereInput | LocationCacheWhereInput[]
    OR?: LocationCacheWhereInput[]
    NOT?: LocationCacheWhereInput | LocationCacheWhereInput[]
    origin?: StringFilter<"LocationCache"> | string
    destination?: StringFilter<"LocationCache"> | string
    travelMinutes?: IntFilter<"LocationCache"> | number
    cachedAt?: DateTimeFilter<"LocationCache"> | Date | string
  }, "id" | "origin_destination">

  export type LocationCacheOrderByWithAggregationInput = {
    id?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    travelMinutes?: SortOrder
    cachedAt?: SortOrder
    _count?: LocationCacheCountOrderByAggregateInput
    _avg?: LocationCacheAvgOrderByAggregateInput
    _max?: LocationCacheMaxOrderByAggregateInput
    _min?: LocationCacheMinOrderByAggregateInput
    _sum?: LocationCacheSumOrderByAggregateInput
  }

  export type LocationCacheScalarWhereWithAggregatesInput = {
    AND?: LocationCacheScalarWhereWithAggregatesInput | LocationCacheScalarWhereWithAggregatesInput[]
    OR?: LocationCacheScalarWhereWithAggregatesInput[]
    NOT?: LocationCacheScalarWhereWithAggregatesInput | LocationCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LocationCache"> | string
    origin?: StringWithAggregatesFilter<"LocationCache"> | string
    destination?: StringWithAggregatesFilter<"LocationCache"> | string
    travelMinutes?: IntWithAggregatesFilter<"LocationCache"> | number
    cachedAt?: DateTimeWithAggregatesFilter<"LocationCache"> | Date | string
  }

  export type HotelWhereInput = {
    AND?: HotelWhereInput | HotelWhereInput[]
    OR?: HotelWhereInput[]
    NOT?: HotelWhereInput | HotelWhereInput[]
    id?: StringFilter<"Hotel"> | string
    tripId?: StringFilter<"Hotel"> | string
    name?: StringFilter<"Hotel"> | string
    address?: StringFilter<"Hotel"> | string
    zone?: StringFilter<"Hotel"> | string
    checkinDay?: IntFilter<"Hotel"> | number
    checkoutDay?: IntFilter<"Hotel"> | number
    checkinDate?: DateTimeFilter<"Hotel"> | Date | string
    checkoutDate?: DateTimeFilter<"Hotel"> | Date | string
    rating?: FloatNullableFilter<"Hotel"> | number | null
    priceRange?: StringNullableFilter<"Hotel"> | string | null
    photoUrl?: StringNullableFilter<"Hotel"> | string | null
    googlePlaceId?: StringNullableFilter<"Hotel"> | string | null
    mapsUrl?: StringNullableFilter<"Hotel"> | string | null
    saved?: BoolFilter<"Hotel"> | boolean
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
  }

  export type HotelOrderByWithRelationInput = {
    id?: SortOrder
    tripId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    zone?: SortOrder
    checkinDay?: SortOrder
    checkoutDay?: SortOrder
    checkinDate?: SortOrder
    checkoutDate?: SortOrder
    rating?: SortOrderInput | SortOrder
    priceRange?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    googlePlaceId?: SortOrderInput | SortOrder
    mapsUrl?: SortOrderInput | SortOrder
    saved?: SortOrder
    trip?: TripOrderByWithRelationInput
  }

  export type HotelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HotelWhereInput | HotelWhereInput[]
    OR?: HotelWhereInput[]
    NOT?: HotelWhereInput | HotelWhereInput[]
    tripId?: StringFilter<"Hotel"> | string
    name?: StringFilter<"Hotel"> | string
    address?: StringFilter<"Hotel"> | string
    zone?: StringFilter<"Hotel"> | string
    checkinDay?: IntFilter<"Hotel"> | number
    checkoutDay?: IntFilter<"Hotel"> | number
    checkinDate?: DateTimeFilter<"Hotel"> | Date | string
    checkoutDate?: DateTimeFilter<"Hotel"> | Date | string
    rating?: FloatNullableFilter<"Hotel"> | number | null
    priceRange?: StringNullableFilter<"Hotel"> | string | null
    photoUrl?: StringNullableFilter<"Hotel"> | string | null
    googlePlaceId?: StringNullableFilter<"Hotel"> | string | null
    mapsUrl?: StringNullableFilter<"Hotel"> | string | null
    saved?: BoolFilter<"Hotel"> | boolean
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
  }, "id">

  export type HotelOrderByWithAggregationInput = {
    id?: SortOrder
    tripId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    zone?: SortOrder
    checkinDay?: SortOrder
    checkoutDay?: SortOrder
    checkinDate?: SortOrder
    checkoutDate?: SortOrder
    rating?: SortOrderInput | SortOrder
    priceRange?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    googlePlaceId?: SortOrderInput | SortOrder
    mapsUrl?: SortOrderInput | SortOrder
    saved?: SortOrder
    _count?: HotelCountOrderByAggregateInput
    _avg?: HotelAvgOrderByAggregateInput
    _max?: HotelMaxOrderByAggregateInput
    _min?: HotelMinOrderByAggregateInput
    _sum?: HotelSumOrderByAggregateInput
  }

  export type HotelScalarWhereWithAggregatesInput = {
    AND?: HotelScalarWhereWithAggregatesInput | HotelScalarWhereWithAggregatesInput[]
    OR?: HotelScalarWhereWithAggregatesInput[]
    NOT?: HotelScalarWhereWithAggregatesInput | HotelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Hotel"> | string
    tripId?: StringWithAggregatesFilter<"Hotel"> | string
    name?: StringWithAggregatesFilter<"Hotel"> | string
    address?: StringWithAggregatesFilter<"Hotel"> | string
    zone?: StringWithAggregatesFilter<"Hotel"> | string
    checkinDay?: IntWithAggregatesFilter<"Hotel"> | number
    checkoutDay?: IntWithAggregatesFilter<"Hotel"> | number
    checkinDate?: DateTimeWithAggregatesFilter<"Hotel"> | Date | string
    checkoutDate?: DateTimeWithAggregatesFilter<"Hotel"> | Date | string
    rating?: FloatNullableWithAggregatesFilter<"Hotel"> | number | null
    priceRange?: StringNullableWithAggregatesFilter<"Hotel"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"Hotel"> | string | null
    googlePlaceId?: StringNullableWithAggregatesFilter<"Hotel"> | string | null
    mapsUrl?: StringNullableWithAggregatesFilter<"Hotel"> | string | null
    saved?: BoolWithAggregatesFilter<"Hotel"> | boolean
  }

  export type TripMessageWhereInput = {
    AND?: TripMessageWhereInput | TripMessageWhereInput[]
    OR?: TripMessageWhereInput[]
    NOT?: TripMessageWhereInput | TripMessageWhereInput[]
    id?: StringFilter<"TripMessage"> | string
    tripId?: StringFilter<"TripMessage"> | string
    userId?: StringFilter<"TripMessage"> | string
    userName?: StringFilter<"TripMessage"> | string
    content?: StringFilter<"TripMessage"> | string
    createdAt?: DateTimeFilter<"TripMessage"> | Date | string
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
  }

  export type TripMessageOrderByWithRelationInput = {
    id?: SortOrder
    tripId?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    trip?: TripOrderByWithRelationInput
  }

  export type TripMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TripMessageWhereInput | TripMessageWhereInput[]
    OR?: TripMessageWhereInput[]
    NOT?: TripMessageWhereInput | TripMessageWhereInput[]
    tripId?: StringFilter<"TripMessage"> | string
    userId?: StringFilter<"TripMessage"> | string
    userName?: StringFilter<"TripMessage"> | string
    content?: StringFilter<"TripMessage"> | string
    createdAt?: DateTimeFilter<"TripMessage"> | Date | string
    trip?: XOR<TripScalarRelationFilter, TripWhereInput>
  }, "id">

  export type TripMessageOrderByWithAggregationInput = {
    id?: SortOrder
    tripId?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: TripMessageCountOrderByAggregateInput
    _max?: TripMessageMaxOrderByAggregateInput
    _min?: TripMessageMinOrderByAggregateInput
  }

  export type TripMessageScalarWhereWithAggregatesInput = {
    AND?: TripMessageScalarWhereWithAggregatesInput | TripMessageScalarWhereWithAggregatesInput[]
    OR?: TripMessageScalarWhereWithAggregatesInput[]
    NOT?: TripMessageScalarWhereWithAggregatesInput | TripMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TripMessage"> | string
    tripId?: StringWithAggregatesFilter<"TripMessage"> | string
    userId?: StringWithAggregatesFilter<"TripMessage"> | string
    userName?: StringWithAggregatesFilter<"TripMessage"> | string
    content?: StringWithAggregatesFilter<"TripMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TripMessage"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    travelStyle: string
    pace: string
    budgetRange: string
    currency?: string
    distanceUnit?: string
    theme?: string
    emailAlerts?: boolean
    createdAt?: Date | string
    trips?: CollaboratorCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    travelStyle: string
    pace: string
    budgetRange: string
    currency?: string
    distanceUnit?: string
    theme?: string
    emailAlerts?: boolean
    createdAt?: Date | string
    trips?: CollaboratorUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    travelStyle?: StringFieldUpdateOperationsInput | string
    pace?: StringFieldUpdateOperationsInput | string
    budgetRange?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    distanceUnit?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    emailAlerts?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trips?: CollaboratorUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    travelStyle?: StringFieldUpdateOperationsInput | string
    pace?: StringFieldUpdateOperationsInput | string
    budgetRange?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    distanceUnit?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    emailAlerts?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trips?: CollaboratorUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    travelStyle: string
    pace: string
    budgetRange: string
    currency?: string
    distanceUnit?: string
    theme?: string
    emailAlerts?: boolean
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    travelStyle?: StringFieldUpdateOperationsInput | string
    pace?: StringFieldUpdateOperationsInput | string
    budgetRange?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    distanceUnit?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    emailAlerts?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    travelStyle?: StringFieldUpdateOperationsInput | string
    pace?: StringFieldUpdateOperationsInput | string
    budgetRange?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    distanceUnit?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    emailAlerts?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripCreateInput = {
    id?: string
    name: string
    destination: string
    startDate: Date | string
    endDate: Date | string
    travelers: number
    originCity: string
    transportMode: string
    estimatedTravelHours: number
    createdAt?: Date | string
    shareToken?: string
    tripCode?: string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorCreateNestedManyWithoutTripInput
    items?: ItineraryItemCreateNestedManyWithoutTripInput
    hotels?: HotelCreateNestedManyWithoutTripInput
    messages?: TripMessageCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateInput = {
    id?: string
    name: string
    destination: string
    startDate: Date | string
    endDate: Date | string
    travelers: number
    originCity: string
    transportMode: string
    estimatedTravelHours: number
    createdAt?: Date | string
    shareToken?: string
    tripCode?: string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorUncheckedCreateNestedManyWithoutTripInput
    items?: ItineraryItemUncheckedCreateNestedManyWithoutTripInput
    hotels?: HotelUncheckedCreateNestedManyWithoutTripInput
    messages?: TripMessageUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    travelers?: IntFieldUpdateOperationsInput | number
    originCity?: StringFieldUpdateOperationsInput | string
    transportMode?: StringFieldUpdateOperationsInput | string
    estimatedTravelHours?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    tripCode?: NullableStringFieldUpdateOperationsInput | string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorUpdateManyWithoutTripNestedInput
    items?: ItineraryItemUpdateManyWithoutTripNestedInput
    hotels?: HotelUpdateManyWithoutTripNestedInput
    messages?: TripMessageUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    travelers?: IntFieldUpdateOperationsInput | number
    originCity?: StringFieldUpdateOperationsInput | string
    transportMode?: StringFieldUpdateOperationsInput | string
    estimatedTravelHours?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    tripCode?: NullableStringFieldUpdateOperationsInput | string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorUncheckedUpdateManyWithoutTripNestedInput
    items?: ItineraryItemUncheckedUpdateManyWithoutTripNestedInput
    hotels?: HotelUncheckedUpdateManyWithoutTripNestedInput
    messages?: TripMessageUncheckedUpdateManyWithoutTripNestedInput
  }

  export type TripCreateManyInput = {
    id?: string
    name: string
    destination: string
    startDate: Date | string
    endDate: Date | string
    travelers: number
    originCity: string
    transportMode: string
    estimatedTravelHours: number
    createdAt?: Date | string
    shareToken?: string
    tripCode?: string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TripUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    travelers?: IntFieldUpdateOperationsInput | number
    originCity?: StringFieldUpdateOperationsInput | string
    transportMode?: StringFieldUpdateOperationsInput | string
    estimatedTravelHours?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    tripCode?: NullableStringFieldUpdateOperationsInput | string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TripUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    travelers?: IntFieldUpdateOperationsInput | number
    originCity?: StringFieldUpdateOperationsInput | string
    transportMode?: StringFieldUpdateOperationsInput | string
    estimatedTravelHours?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    tripCode?: NullableStringFieldUpdateOperationsInput | string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CollaboratorCreateInput = {
    id?: string
    role: string
    trip: TripCreateNestedOneWithoutCollaboratorsInput
    user: UserCreateNestedOneWithoutTripsInput
  }

  export type CollaboratorUncheckedCreateInput = {
    id?: string
    tripId: string
    userId: string
    role: string
  }

  export type CollaboratorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    trip?: TripUpdateOneRequiredWithoutCollaboratorsNestedInput
    user?: UserUpdateOneRequiredWithoutTripsNestedInput
  }

  export type CollaboratorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type CollaboratorCreateManyInput = {
    id?: string
    tripId: string
    userId: string
    role: string
  }

  export type CollaboratorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type CollaboratorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type ItineraryItemCreateInput = {
    id?: string
    day: number
    position: number
    type?: string
    time: string
    activity: string
    location: string
    lat?: number | null
    lng?: number | null
    durationMinutes: number
    estimatedCost: number
    category: string
    notes?: string | null
    travelTimeFromPrevious?: number | null
    hasTimingConflict?: boolean
    createdAt?: Date | string
    trip: TripCreateNestedOneWithoutItemsInput
  }

  export type ItineraryItemUncheckedCreateInput = {
    id?: string
    tripId: string
    day: number
    position: number
    type?: string
    time: string
    activity: string
    location: string
    lat?: number | null
    lng?: number | null
    durationMinutes: number
    estimatedCost: number
    category: string
    notes?: string | null
    travelTimeFromPrevious?: number | null
    hasTimingConflict?: boolean
    createdAt?: Date | string
  }

  export type ItineraryItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: IntFieldUpdateOperationsInput | number
    position?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    estimatedCost?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    travelTimeFromPrevious?: NullableIntFieldUpdateOperationsInput | number | null
    hasTimingConflict?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trip?: TripUpdateOneRequiredWithoutItemsNestedInput
  }

  export type ItineraryItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    day?: IntFieldUpdateOperationsInput | number
    position?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    estimatedCost?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    travelTimeFromPrevious?: NullableIntFieldUpdateOperationsInput | number | null
    hasTimingConflict?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItineraryItemCreateManyInput = {
    id?: string
    tripId: string
    day: number
    position: number
    type?: string
    time: string
    activity: string
    location: string
    lat?: number | null
    lng?: number | null
    durationMinutes: number
    estimatedCost: number
    category: string
    notes?: string | null
    travelTimeFromPrevious?: number | null
    hasTimingConflict?: boolean
    createdAt?: Date | string
  }

  export type ItineraryItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: IntFieldUpdateOperationsInput | number
    position?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    estimatedCost?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    travelTimeFromPrevious?: NullableIntFieldUpdateOperationsInput | number | null
    hasTimingConflict?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItineraryItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    day?: IntFieldUpdateOperationsInput | number
    position?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    estimatedCost?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    travelTimeFromPrevious?: NullableIntFieldUpdateOperationsInput | number | null
    hasTimingConflict?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCacheCreateInput = {
    id?: string
    origin: string
    destination: string
    travelMinutes: number
    cachedAt?: Date | string
  }

  export type LocationCacheUncheckedCreateInput = {
    id?: string
    origin: string
    destination: string
    travelMinutes: number
    cachedAt?: Date | string
  }

  export type LocationCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    travelMinutes?: IntFieldUpdateOperationsInput | number
    cachedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    travelMinutes?: IntFieldUpdateOperationsInput | number
    cachedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCacheCreateManyInput = {
    id?: string
    origin: string
    destination: string
    travelMinutes: number
    cachedAt?: Date | string
  }

  export type LocationCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    travelMinutes?: IntFieldUpdateOperationsInput | number
    cachedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    travelMinutes?: IntFieldUpdateOperationsInput | number
    cachedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HotelCreateInput = {
    id?: string
    name: string
    address: string
    zone: string
    checkinDay: number
    checkoutDay: number
    checkinDate: Date | string
    checkoutDate: Date | string
    rating?: number | null
    priceRange?: string | null
    photoUrl?: string | null
    googlePlaceId?: string | null
    mapsUrl?: string | null
    saved?: boolean
    trip: TripCreateNestedOneWithoutHotelsInput
  }

  export type HotelUncheckedCreateInput = {
    id?: string
    tripId: string
    name: string
    address: string
    zone: string
    checkinDay: number
    checkoutDay: number
    checkinDate: Date | string
    checkoutDate: Date | string
    rating?: number | null
    priceRange?: string | null
    photoUrl?: string | null
    googlePlaceId?: string | null
    mapsUrl?: string | null
    saved?: boolean
  }

  export type HotelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    checkinDay?: IntFieldUpdateOperationsInput | number
    checkoutDay?: IntFieldUpdateOperationsInput | number
    checkinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkoutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    priceRange?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: NullableStringFieldUpdateOperationsInput | string | null
    mapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    saved?: BoolFieldUpdateOperationsInput | boolean
    trip?: TripUpdateOneRequiredWithoutHotelsNestedInput
  }

  export type HotelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    checkinDay?: IntFieldUpdateOperationsInput | number
    checkoutDay?: IntFieldUpdateOperationsInput | number
    checkinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkoutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    priceRange?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: NullableStringFieldUpdateOperationsInput | string | null
    mapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    saved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HotelCreateManyInput = {
    id?: string
    tripId: string
    name: string
    address: string
    zone: string
    checkinDay: number
    checkoutDay: number
    checkinDate: Date | string
    checkoutDate: Date | string
    rating?: number | null
    priceRange?: string | null
    photoUrl?: string | null
    googlePlaceId?: string | null
    mapsUrl?: string | null
    saved?: boolean
  }

  export type HotelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    checkinDay?: IntFieldUpdateOperationsInput | number
    checkoutDay?: IntFieldUpdateOperationsInput | number
    checkinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkoutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    priceRange?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: NullableStringFieldUpdateOperationsInput | string | null
    mapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    saved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HotelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    checkinDay?: IntFieldUpdateOperationsInput | number
    checkoutDay?: IntFieldUpdateOperationsInput | number
    checkinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkoutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    priceRange?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: NullableStringFieldUpdateOperationsInput | string | null
    mapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    saved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TripMessageCreateInput = {
    id?: string
    userId: string
    userName: string
    content: string
    createdAt?: Date | string
    trip: TripCreateNestedOneWithoutMessagesInput
  }

  export type TripMessageUncheckedCreateInput = {
    id?: string
    tripId: string
    userId: string
    userName: string
    content: string
    createdAt?: Date | string
  }

  export type TripMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trip?: TripUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type TripMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripMessageCreateManyInput = {
    id?: string
    tripId: string
    userId: string
    userName: string
    content: string
    createdAt?: Date | string
  }

  export type TripMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CollaboratorListRelationFilter = {
    every?: CollaboratorWhereInput
    some?: CollaboratorWhereInput
    none?: CollaboratorWhereInput
  }

  export type CollaboratorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    travelStyle?: SortOrder
    pace?: SortOrder
    budgetRange?: SortOrder
    currency?: SortOrder
    distanceUnit?: SortOrder
    theme?: SortOrder
    emailAlerts?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    travelStyle?: SortOrder
    pace?: SortOrder
    budgetRange?: SortOrder
    currency?: SortOrder
    distanceUnit?: SortOrder
    theme?: SortOrder
    emailAlerts?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    travelStyle?: SortOrder
    pace?: SortOrder
    budgetRange?: SortOrder
    currency?: SortOrder
    distanceUnit?: SortOrder
    theme?: SortOrder
    emailAlerts?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ItineraryItemListRelationFilter = {
    every?: ItineraryItemWhereInput
    some?: ItineraryItemWhereInput
    none?: ItineraryItemWhereInput
  }

  export type HotelListRelationFilter = {
    every?: HotelWhereInput
    some?: HotelWhereInput
    none?: HotelWhereInput
  }

  export type TripMessageListRelationFilter = {
    every?: TripMessageWhereInput
    some?: TripMessageWhereInput
    none?: TripMessageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ItineraryItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HotelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TripMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TripCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    destination?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    travelers?: SortOrder
    originCity?: SortOrder
    transportMode?: SortOrder
    estimatedTravelHours?: SortOrder
    createdAt?: SortOrder
    shareToken?: SortOrder
    tripCode?: SortOrder
    dailySummaries?: SortOrder
  }

  export type TripAvgOrderByAggregateInput = {
    travelers?: SortOrder
    estimatedTravelHours?: SortOrder
  }

  export type TripMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    destination?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    travelers?: SortOrder
    originCity?: SortOrder
    transportMode?: SortOrder
    estimatedTravelHours?: SortOrder
    createdAt?: SortOrder
    shareToken?: SortOrder
    tripCode?: SortOrder
  }

  export type TripMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    destination?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    travelers?: SortOrder
    originCity?: SortOrder
    transportMode?: SortOrder
    estimatedTravelHours?: SortOrder
    createdAt?: SortOrder
    shareToken?: SortOrder
    tripCode?: SortOrder
  }

  export type TripSumOrderByAggregateInput = {
    travelers?: SortOrder
    estimatedTravelHours?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type TripScalarRelationFilter = {
    is?: TripWhereInput
    isNot?: TripWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CollaboratorTripIdUserIdCompoundUniqueInput = {
    tripId: string
    userId: string
  }

  export type CollaboratorCountOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
  }

  export type CollaboratorMaxOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
  }

  export type CollaboratorMinOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ItineraryItemCountOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    day?: SortOrder
    position?: SortOrder
    type?: SortOrder
    time?: SortOrder
    activity?: SortOrder
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    durationMinutes?: SortOrder
    estimatedCost?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    travelTimeFromPrevious?: SortOrder
    hasTimingConflict?: SortOrder
    createdAt?: SortOrder
  }

  export type ItineraryItemAvgOrderByAggregateInput = {
    day?: SortOrder
    position?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    durationMinutes?: SortOrder
    estimatedCost?: SortOrder
    travelTimeFromPrevious?: SortOrder
  }

  export type ItineraryItemMaxOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    day?: SortOrder
    position?: SortOrder
    type?: SortOrder
    time?: SortOrder
    activity?: SortOrder
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    durationMinutes?: SortOrder
    estimatedCost?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    travelTimeFromPrevious?: SortOrder
    hasTimingConflict?: SortOrder
    createdAt?: SortOrder
  }

  export type ItineraryItemMinOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    day?: SortOrder
    position?: SortOrder
    type?: SortOrder
    time?: SortOrder
    activity?: SortOrder
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    durationMinutes?: SortOrder
    estimatedCost?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    travelTimeFromPrevious?: SortOrder
    hasTimingConflict?: SortOrder
    createdAt?: SortOrder
  }

  export type ItineraryItemSumOrderByAggregateInput = {
    day?: SortOrder
    position?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    durationMinutes?: SortOrder
    estimatedCost?: SortOrder
    travelTimeFromPrevious?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type LocationCacheOriginDestinationCompoundUniqueInput = {
    origin: string
    destination: string
  }

  export type LocationCacheCountOrderByAggregateInput = {
    id?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    travelMinutes?: SortOrder
    cachedAt?: SortOrder
  }

  export type LocationCacheAvgOrderByAggregateInput = {
    travelMinutes?: SortOrder
  }

  export type LocationCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    travelMinutes?: SortOrder
    cachedAt?: SortOrder
  }

  export type LocationCacheMinOrderByAggregateInput = {
    id?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    travelMinutes?: SortOrder
    cachedAt?: SortOrder
  }

  export type LocationCacheSumOrderByAggregateInput = {
    travelMinutes?: SortOrder
  }

  export type HotelCountOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    zone?: SortOrder
    checkinDay?: SortOrder
    checkoutDay?: SortOrder
    checkinDate?: SortOrder
    checkoutDate?: SortOrder
    rating?: SortOrder
    priceRange?: SortOrder
    photoUrl?: SortOrder
    googlePlaceId?: SortOrder
    mapsUrl?: SortOrder
    saved?: SortOrder
  }

  export type HotelAvgOrderByAggregateInput = {
    checkinDay?: SortOrder
    checkoutDay?: SortOrder
    rating?: SortOrder
  }

  export type HotelMaxOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    zone?: SortOrder
    checkinDay?: SortOrder
    checkoutDay?: SortOrder
    checkinDate?: SortOrder
    checkoutDate?: SortOrder
    rating?: SortOrder
    priceRange?: SortOrder
    photoUrl?: SortOrder
    googlePlaceId?: SortOrder
    mapsUrl?: SortOrder
    saved?: SortOrder
  }

  export type HotelMinOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    zone?: SortOrder
    checkinDay?: SortOrder
    checkoutDay?: SortOrder
    checkinDate?: SortOrder
    checkoutDate?: SortOrder
    rating?: SortOrder
    priceRange?: SortOrder
    photoUrl?: SortOrder
    googlePlaceId?: SortOrder
    mapsUrl?: SortOrder
    saved?: SortOrder
  }

  export type HotelSumOrderByAggregateInput = {
    checkinDay?: SortOrder
    checkoutDay?: SortOrder
    rating?: SortOrder
  }

  export type TripMessageCountOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type TripMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type TripMessageMinOrderByAggregateInput = {
    id?: SortOrder
    tripId?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CollaboratorCreateNestedManyWithoutUserInput = {
    create?: XOR<CollaboratorCreateWithoutUserInput, CollaboratorUncheckedCreateWithoutUserInput> | CollaboratorCreateWithoutUserInput[] | CollaboratorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CollaboratorCreateOrConnectWithoutUserInput | CollaboratorCreateOrConnectWithoutUserInput[]
    createMany?: CollaboratorCreateManyUserInputEnvelope
    connect?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
  }

  export type CollaboratorUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CollaboratorCreateWithoutUserInput, CollaboratorUncheckedCreateWithoutUserInput> | CollaboratorCreateWithoutUserInput[] | CollaboratorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CollaboratorCreateOrConnectWithoutUserInput | CollaboratorCreateOrConnectWithoutUserInput[]
    createMany?: CollaboratorCreateManyUserInputEnvelope
    connect?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CollaboratorUpdateManyWithoutUserNestedInput = {
    create?: XOR<CollaboratorCreateWithoutUserInput, CollaboratorUncheckedCreateWithoutUserInput> | CollaboratorCreateWithoutUserInput[] | CollaboratorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CollaboratorCreateOrConnectWithoutUserInput | CollaboratorCreateOrConnectWithoutUserInput[]
    upsert?: CollaboratorUpsertWithWhereUniqueWithoutUserInput | CollaboratorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CollaboratorCreateManyUserInputEnvelope
    set?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    disconnect?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    delete?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    connect?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    update?: CollaboratorUpdateWithWhereUniqueWithoutUserInput | CollaboratorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CollaboratorUpdateManyWithWhereWithoutUserInput | CollaboratorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CollaboratorScalarWhereInput | CollaboratorScalarWhereInput[]
  }

  export type CollaboratorUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CollaboratorCreateWithoutUserInput, CollaboratorUncheckedCreateWithoutUserInput> | CollaboratorCreateWithoutUserInput[] | CollaboratorUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CollaboratorCreateOrConnectWithoutUserInput | CollaboratorCreateOrConnectWithoutUserInput[]
    upsert?: CollaboratorUpsertWithWhereUniqueWithoutUserInput | CollaboratorUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CollaboratorCreateManyUserInputEnvelope
    set?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    disconnect?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    delete?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    connect?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    update?: CollaboratorUpdateWithWhereUniqueWithoutUserInput | CollaboratorUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CollaboratorUpdateManyWithWhereWithoutUserInput | CollaboratorUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CollaboratorScalarWhereInput | CollaboratorScalarWhereInput[]
  }

  export type CollaboratorCreateNestedManyWithoutTripInput = {
    create?: XOR<CollaboratorCreateWithoutTripInput, CollaboratorUncheckedCreateWithoutTripInput> | CollaboratorCreateWithoutTripInput[] | CollaboratorUncheckedCreateWithoutTripInput[]
    connectOrCreate?: CollaboratorCreateOrConnectWithoutTripInput | CollaboratorCreateOrConnectWithoutTripInput[]
    createMany?: CollaboratorCreateManyTripInputEnvelope
    connect?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
  }

  export type ItineraryItemCreateNestedManyWithoutTripInput = {
    create?: XOR<ItineraryItemCreateWithoutTripInput, ItineraryItemUncheckedCreateWithoutTripInput> | ItineraryItemCreateWithoutTripInput[] | ItineraryItemUncheckedCreateWithoutTripInput[]
    connectOrCreate?: ItineraryItemCreateOrConnectWithoutTripInput | ItineraryItemCreateOrConnectWithoutTripInput[]
    createMany?: ItineraryItemCreateManyTripInputEnvelope
    connect?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
  }

  export type HotelCreateNestedManyWithoutTripInput = {
    create?: XOR<HotelCreateWithoutTripInput, HotelUncheckedCreateWithoutTripInput> | HotelCreateWithoutTripInput[] | HotelUncheckedCreateWithoutTripInput[]
    connectOrCreate?: HotelCreateOrConnectWithoutTripInput | HotelCreateOrConnectWithoutTripInput[]
    createMany?: HotelCreateManyTripInputEnvelope
    connect?: HotelWhereUniqueInput | HotelWhereUniqueInput[]
  }

  export type TripMessageCreateNestedManyWithoutTripInput = {
    create?: XOR<TripMessageCreateWithoutTripInput, TripMessageUncheckedCreateWithoutTripInput> | TripMessageCreateWithoutTripInput[] | TripMessageUncheckedCreateWithoutTripInput[]
    connectOrCreate?: TripMessageCreateOrConnectWithoutTripInput | TripMessageCreateOrConnectWithoutTripInput[]
    createMany?: TripMessageCreateManyTripInputEnvelope
    connect?: TripMessageWhereUniqueInput | TripMessageWhereUniqueInput[]
  }

  export type CollaboratorUncheckedCreateNestedManyWithoutTripInput = {
    create?: XOR<CollaboratorCreateWithoutTripInput, CollaboratorUncheckedCreateWithoutTripInput> | CollaboratorCreateWithoutTripInput[] | CollaboratorUncheckedCreateWithoutTripInput[]
    connectOrCreate?: CollaboratorCreateOrConnectWithoutTripInput | CollaboratorCreateOrConnectWithoutTripInput[]
    createMany?: CollaboratorCreateManyTripInputEnvelope
    connect?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
  }

  export type ItineraryItemUncheckedCreateNestedManyWithoutTripInput = {
    create?: XOR<ItineraryItemCreateWithoutTripInput, ItineraryItemUncheckedCreateWithoutTripInput> | ItineraryItemCreateWithoutTripInput[] | ItineraryItemUncheckedCreateWithoutTripInput[]
    connectOrCreate?: ItineraryItemCreateOrConnectWithoutTripInput | ItineraryItemCreateOrConnectWithoutTripInput[]
    createMany?: ItineraryItemCreateManyTripInputEnvelope
    connect?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
  }

  export type HotelUncheckedCreateNestedManyWithoutTripInput = {
    create?: XOR<HotelCreateWithoutTripInput, HotelUncheckedCreateWithoutTripInput> | HotelCreateWithoutTripInput[] | HotelUncheckedCreateWithoutTripInput[]
    connectOrCreate?: HotelCreateOrConnectWithoutTripInput | HotelCreateOrConnectWithoutTripInput[]
    createMany?: HotelCreateManyTripInputEnvelope
    connect?: HotelWhereUniqueInput | HotelWhereUniqueInput[]
  }

  export type TripMessageUncheckedCreateNestedManyWithoutTripInput = {
    create?: XOR<TripMessageCreateWithoutTripInput, TripMessageUncheckedCreateWithoutTripInput> | TripMessageCreateWithoutTripInput[] | TripMessageUncheckedCreateWithoutTripInput[]
    connectOrCreate?: TripMessageCreateOrConnectWithoutTripInput | TripMessageCreateOrConnectWithoutTripInput[]
    createMany?: TripMessageCreateManyTripInputEnvelope
    connect?: TripMessageWhereUniqueInput | TripMessageWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CollaboratorUpdateManyWithoutTripNestedInput = {
    create?: XOR<CollaboratorCreateWithoutTripInput, CollaboratorUncheckedCreateWithoutTripInput> | CollaboratorCreateWithoutTripInput[] | CollaboratorUncheckedCreateWithoutTripInput[]
    connectOrCreate?: CollaboratorCreateOrConnectWithoutTripInput | CollaboratorCreateOrConnectWithoutTripInput[]
    upsert?: CollaboratorUpsertWithWhereUniqueWithoutTripInput | CollaboratorUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: CollaboratorCreateManyTripInputEnvelope
    set?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    disconnect?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    delete?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    connect?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    update?: CollaboratorUpdateWithWhereUniqueWithoutTripInput | CollaboratorUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: CollaboratorUpdateManyWithWhereWithoutTripInput | CollaboratorUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: CollaboratorScalarWhereInput | CollaboratorScalarWhereInput[]
  }

  export type ItineraryItemUpdateManyWithoutTripNestedInput = {
    create?: XOR<ItineraryItemCreateWithoutTripInput, ItineraryItemUncheckedCreateWithoutTripInput> | ItineraryItemCreateWithoutTripInput[] | ItineraryItemUncheckedCreateWithoutTripInput[]
    connectOrCreate?: ItineraryItemCreateOrConnectWithoutTripInput | ItineraryItemCreateOrConnectWithoutTripInput[]
    upsert?: ItineraryItemUpsertWithWhereUniqueWithoutTripInput | ItineraryItemUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: ItineraryItemCreateManyTripInputEnvelope
    set?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    disconnect?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    delete?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    connect?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    update?: ItineraryItemUpdateWithWhereUniqueWithoutTripInput | ItineraryItemUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: ItineraryItemUpdateManyWithWhereWithoutTripInput | ItineraryItemUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: ItineraryItemScalarWhereInput | ItineraryItemScalarWhereInput[]
  }

  export type HotelUpdateManyWithoutTripNestedInput = {
    create?: XOR<HotelCreateWithoutTripInput, HotelUncheckedCreateWithoutTripInput> | HotelCreateWithoutTripInput[] | HotelUncheckedCreateWithoutTripInput[]
    connectOrCreate?: HotelCreateOrConnectWithoutTripInput | HotelCreateOrConnectWithoutTripInput[]
    upsert?: HotelUpsertWithWhereUniqueWithoutTripInput | HotelUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: HotelCreateManyTripInputEnvelope
    set?: HotelWhereUniqueInput | HotelWhereUniqueInput[]
    disconnect?: HotelWhereUniqueInput | HotelWhereUniqueInput[]
    delete?: HotelWhereUniqueInput | HotelWhereUniqueInput[]
    connect?: HotelWhereUniqueInput | HotelWhereUniqueInput[]
    update?: HotelUpdateWithWhereUniqueWithoutTripInput | HotelUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: HotelUpdateManyWithWhereWithoutTripInput | HotelUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: HotelScalarWhereInput | HotelScalarWhereInput[]
  }

  export type TripMessageUpdateManyWithoutTripNestedInput = {
    create?: XOR<TripMessageCreateWithoutTripInput, TripMessageUncheckedCreateWithoutTripInput> | TripMessageCreateWithoutTripInput[] | TripMessageUncheckedCreateWithoutTripInput[]
    connectOrCreate?: TripMessageCreateOrConnectWithoutTripInput | TripMessageCreateOrConnectWithoutTripInput[]
    upsert?: TripMessageUpsertWithWhereUniqueWithoutTripInput | TripMessageUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: TripMessageCreateManyTripInputEnvelope
    set?: TripMessageWhereUniqueInput | TripMessageWhereUniqueInput[]
    disconnect?: TripMessageWhereUniqueInput | TripMessageWhereUniqueInput[]
    delete?: TripMessageWhereUniqueInput | TripMessageWhereUniqueInput[]
    connect?: TripMessageWhereUniqueInput | TripMessageWhereUniqueInput[]
    update?: TripMessageUpdateWithWhereUniqueWithoutTripInput | TripMessageUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: TripMessageUpdateManyWithWhereWithoutTripInput | TripMessageUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: TripMessageScalarWhereInput | TripMessageScalarWhereInput[]
  }

  export type CollaboratorUncheckedUpdateManyWithoutTripNestedInput = {
    create?: XOR<CollaboratorCreateWithoutTripInput, CollaboratorUncheckedCreateWithoutTripInput> | CollaboratorCreateWithoutTripInput[] | CollaboratorUncheckedCreateWithoutTripInput[]
    connectOrCreate?: CollaboratorCreateOrConnectWithoutTripInput | CollaboratorCreateOrConnectWithoutTripInput[]
    upsert?: CollaboratorUpsertWithWhereUniqueWithoutTripInput | CollaboratorUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: CollaboratorCreateManyTripInputEnvelope
    set?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    disconnect?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    delete?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    connect?: CollaboratorWhereUniqueInput | CollaboratorWhereUniqueInput[]
    update?: CollaboratorUpdateWithWhereUniqueWithoutTripInput | CollaboratorUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: CollaboratorUpdateManyWithWhereWithoutTripInput | CollaboratorUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: CollaboratorScalarWhereInput | CollaboratorScalarWhereInput[]
  }

  export type ItineraryItemUncheckedUpdateManyWithoutTripNestedInput = {
    create?: XOR<ItineraryItemCreateWithoutTripInput, ItineraryItemUncheckedCreateWithoutTripInput> | ItineraryItemCreateWithoutTripInput[] | ItineraryItemUncheckedCreateWithoutTripInput[]
    connectOrCreate?: ItineraryItemCreateOrConnectWithoutTripInput | ItineraryItemCreateOrConnectWithoutTripInput[]
    upsert?: ItineraryItemUpsertWithWhereUniqueWithoutTripInput | ItineraryItemUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: ItineraryItemCreateManyTripInputEnvelope
    set?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    disconnect?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    delete?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    connect?: ItineraryItemWhereUniqueInput | ItineraryItemWhereUniqueInput[]
    update?: ItineraryItemUpdateWithWhereUniqueWithoutTripInput | ItineraryItemUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: ItineraryItemUpdateManyWithWhereWithoutTripInput | ItineraryItemUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: ItineraryItemScalarWhereInput | ItineraryItemScalarWhereInput[]
  }

  export type HotelUncheckedUpdateManyWithoutTripNestedInput = {
    create?: XOR<HotelCreateWithoutTripInput, HotelUncheckedCreateWithoutTripInput> | HotelCreateWithoutTripInput[] | HotelUncheckedCreateWithoutTripInput[]
    connectOrCreate?: HotelCreateOrConnectWithoutTripInput | HotelCreateOrConnectWithoutTripInput[]
    upsert?: HotelUpsertWithWhereUniqueWithoutTripInput | HotelUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: HotelCreateManyTripInputEnvelope
    set?: HotelWhereUniqueInput | HotelWhereUniqueInput[]
    disconnect?: HotelWhereUniqueInput | HotelWhereUniqueInput[]
    delete?: HotelWhereUniqueInput | HotelWhereUniqueInput[]
    connect?: HotelWhereUniqueInput | HotelWhereUniqueInput[]
    update?: HotelUpdateWithWhereUniqueWithoutTripInput | HotelUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: HotelUpdateManyWithWhereWithoutTripInput | HotelUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: HotelScalarWhereInput | HotelScalarWhereInput[]
  }

  export type TripMessageUncheckedUpdateManyWithoutTripNestedInput = {
    create?: XOR<TripMessageCreateWithoutTripInput, TripMessageUncheckedCreateWithoutTripInput> | TripMessageCreateWithoutTripInput[] | TripMessageUncheckedCreateWithoutTripInput[]
    connectOrCreate?: TripMessageCreateOrConnectWithoutTripInput | TripMessageCreateOrConnectWithoutTripInput[]
    upsert?: TripMessageUpsertWithWhereUniqueWithoutTripInput | TripMessageUpsertWithWhereUniqueWithoutTripInput[]
    createMany?: TripMessageCreateManyTripInputEnvelope
    set?: TripMessageWhereUniqueInput | TripMessageWhereUniqueInput[]
    disconnect?: TripMessageWhereUniqueInput | TripMessageWhereUniqueInput[]
    delete?: TripMessageWhereUniqueInput | TripMessageWhereUniqueInput[]
    connect?: TripMessageWhereUniqueInput | TripMessageWhereUniqueInput[]
    update?: TripMessageUpdateWithWhereUniqueWithoutTripInput | TripMessageUpdateWithWhereUniqueWithoutTripInput[]
    updateMany?: TripMessageUpdateManyWithWhereWithoutTripInput | TripMessageUpdateManyWithWhereWithoutTripInput[]
    deleteMany?: TripMessageScalarWhereInput | TripMessageScalarWhereInput[]
  }

  export type TripCreateNestedOneWithoutCollaboratorsInput = {
    create?: XOR<TripCreateWithoutCollaboratorsInput, TripUncheckedCreateWithoutCollaboratorsInput>
    connectOrCreate?: TripCreateOrConnectWithoutCollaboratorsInput
    connect?: TripWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTripsInput = {
    create?: XOR<UserCreateWithoutTripsInput, UserUncheckedCreateWithoutTripsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTripsInput
    connect?: UserWhereUniqueInput
  }

  export type TripUpdateOneRequiredWithoutCollaboratorsNestedInput = {
    create?: XOR<TripCreateWithoutCollaboratorsInput, TripUncheckedCreateWithoutCollaboratorsInput>
    connectOrCreate?: TripCreateOrConnectWithoutCollaboratorsInput
    upsert?: TripUpsertWithoutCollaboratorsInput
    connect?: TripWhereUniqueInput
    update?: XOR<XOR<TripUpdateToOneWithWhereWithoutCollaboratorsInput, TripUpdateWithoutCollaboratorsInput>, TripUncheckedUpdateWithoutCollaboratorsInput>
  }

  export type UserUpdateOneRequiredWithoutTripsNestedInput = {
    create?: XOR<UserCreateWithoutTripsInput, UserUncheckedCreateWithoutTripsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTripsInput
    upsert?: UserUpsertWithoutTripsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTripsInput, UserUpdateWithoutTripsInput>, UserUncheckedUpdateWithoutTripsInput>
  }

  export type TripCreateNestedOneWithoutItemsInput = {
    create?: XOR<TripCreateWithoutItemsInput, TripUncheckedCreateWithoutItemsInput>
    connectOrCreate?: TripCreateOrConnectWithoutItemsInput
    connect?: TripWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TripUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<TripCreateWithoutItemsInput, TripUncheckedCreateWithoutItemsInput>
    connectOrCreate?: TripCreateOrConnectWithoutItemsInput
    upsert?: TripUpsertWithoutItemsInput
    connect?: TripWhereUniqueInput
    update?: XOR<XOR<TripUpdateToOneWithWhereWithoutItemsInput, TripUpdateWithoutItemsInput>, TripUncheckedUpdateWithoutItemsInput>
  }

  export type TripCreateNestedOneWithoutHotelsInput = {
    create?: XOR<TripCreateWithoutHotelsInput, TripUncheckedCreateWithoutHotelsInput>
    connectOrCreate?: TripCreateOrConnectWithoutHotelsInput
    connect?: TripWhereUniqueInput
  }

  export type TripUpdateOneRequiredWithoutHotelsNestedInput = {
    create?: XOR<TripCreateWithoutHotelsInput, TripUncheckedCreateWithoutHotelsInput>
    connectOrCreate?: TripCreateOrConnectWithoutHotelsInput
    upsert?: TripUpsertWithoutHotelsInput
    connect?: TripWhereUniqueInput
    update?: XOR<XOR<TripUpdateToOneWithWhereWithoutHotelsInput, TripUpdateWithoutHotelsInput>, TripUncheckedUpdateWithoutHotelsInput>
  }

  export type TripCreateNestedOneWithoutMessagesInput = {
    create?: XOR<TripCreateWithoutMessagesInput, TripUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TripCreateOrConnectWithoutMessagesInput
    connect?: TripWhereUniqueInput
  }

  export type TripUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<TripCreateWithoutMessagesInput, TripUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: TripCreateOrConnectWithoutMessagesInput
    upsert?: TripUpsertWithoutMessagesInput
    connect?: TripWhereUniqueInput
    update?: XOR<XOR<TripUpdateToOneWithWhereWithoutMessagesInput, TripUpdateWithoutMessagesInput>, TripUncheckedUpdateWithoutMessagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CollaboratorCreateWithoutUserInput = {
    id?: string
    role: string
    trip: TripCreateNestedOneWithoutCollaboratorsInput
  }

  export type CollaboratorUncheckedCreateWithoutUserInput = {
    id?: string
    tripId: string
    role: string
  }

  export type CollaboratorCreateOrConnectWithoutUserInput = {
    where: CollaboratorWhereUniqueInput
    create: XOR<CollaboratorCreateWithoutUserInput, CollaboratorUncheckedCreateWithoutUserInput>
  }

  export type CollaboratorCreateManyUserInputEnvelope = {
    data: CollaboratorCreateManyUserInput | CollaboratorCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CollaboratorUpsertWithWhereUniqueWithoutUserInput = {
    where: CollaboratorWhereUniqueInput
    update: XOR<CollaboratorUpdateWithoutUserInput, CollaboratorUncheckedUpdateWithoutUserInput>
    create: XOR<CollaboratorCreateWithoutUserInput, CollaboratorUncheckedCreateWithoutUserInput>
  }

  export type CollaboratorUpdateWithWhereUniqueWithoutUserInput = {
    where: CollaboratorWhereUniqueInput
    data: XOR<CollaboratorUpdateWithoutUserInput, CollaboratorUncheckedUpdateWithoutUserInput>
  }

  export type CollaboratorUpdateManyWithWhereWithoutUserInput = {
    where: CollaboratorScalarWhereInput
    data: XOR<CollaboratorUpdateManyMutationInput, CollaboratorUncheckedUpdateManyWithoutUserInput>
  }

  export type CollaboratorScalarWhereInput = {
    AND?: CollaboratorScalarWhereInput | CollaboratorScalarWhereInput[]
    OR?: CollaboratorScalarWhereInput[]
    NOT?: CollaboratorScalarWhereInput | CollaboratorScalarWhereInput[]
    id?: StringFilter<"Collaborator"> | string
    tripId?: StringFilter<"Collaborator"> | string
    userId?: StringFilter<"Collaborator"> | string
    role?: StringFilter<"Collaborator"> | string
  }

  export type CollaboratorCreateWithoutTripInput = {
    id?: string
    role: string
    user: UserCreateNestedOneWithoutTripsInput
  }

  export type CollaboratorUncheckedCreateWithoutTripInput = {
    id?: string
    userId: string
    role: string
  }

  export type CollaboratorCreateOrConnectWithoutTripInput = {
    where: CollaboratorWhereUniqueInput
    create: XOR<CollaboratorCreateWithoutTripInput, CollaboratorUncheckedCreateWithoutTripInput>
  }

  export type CollaboratorCreateManyTripInputEnvelope = {
    data: CollaboratorCreateManyTripInput | CollaboratorCreateManyTripInput[]
    skipDuplicates?: boolean
  }

  export type ItineraryItemCreateWithoutTripInput = {
    id?: string
    day: number
    position: number
    type?: string
    time: string
    activity: string
    location: string
    lat?: number | null
    lng?: number | null
    durationMinutes: number
    estimatedCost: number
    category: string
    notes?: string | null
    travelTimeFromPrevious?: number | null
    hasTimingConflict?: boolean
    createdAt?: Date | string
  }

  export type ItineraryItemUncheckedCreateWithoutTripInput = {
    id?: string
    day: number
    position: number
    type?: string
    time: string
    activity: string
    location: string
    lat?: number | null
    lng?: number | null
    durationMinutes: number
    estimatedCost: number
    category: string
    notes?: string | null
    travelTimeFromPrevious?: number | null
    hasTimingConflict?: boolean
    createdAt?: Date | string
  }

  export type ItineraryItemCreateOrConnectWithoutTripInput = {
    where: ItineraryItemWhereUniqueInput
    create: XOR<ItineraryItemCreateWithoutTripInput, ItineraryItemUncheckedCreateWithoutTripInput>
  }

  export type ItineraryItemCreateManyTripInputEnvelope = {
    data: ItineraryItemCreateManyTripInput | ItineraryItemCreateManyTripInput[]
    skipDuplicates?: boolean
  }

  export type HotelCreateWithoutTripInput = {
    id?: string
    name: string
    address: string
    zone: string
    checkinDay: number
    checkoutDay: number
    checkinDate: Date | string
    checkoutDate: Date | string
    rating?: number | null
    priceRange?: string | null
    photoUrl?: string | null
    googlePlaceId?: string | null
    mapsUrl?: string | null
    saved?: boolean
  }

  export type HotelUncheckedCreateWithoutTripInput = {
    id?: string
    name: string
    address: string
    zone: string
    checkinDay: number
    checkoutDay: number
    checkinDate: Date | string
    checkoutDate: Date | string
    rating?: number | null
    priceRange?: string | null
    photoUrl?: string | null
    googlePlaceId?: string | null
    mapsUrl?: string | null
    saved?: boolean
  }

  export type HotelCreateOrConnectWithoutTripInput = {
    where: HotelWhereUniqueInput
    create: XOR<HotelCreateWithoutTripInput, HotelUncheckedCreateWithoutTripInput>
  }

  export type HotelCreateManyTripInputEnvelope = {
    data: HotelCreateManyTripInput | HotelCreateManyTripInput[]
    skipDuplicates?: boolean
  }

  export type TripMessageCreateWithoutTripInput = {
    id?: string
    userId: string
    userName: string
    content: string
    createdAt?: Date | string
  }

  export type TripMessageUncheckedCreateWithoutTripInput = {
    id?: string
    userId: string
    userName: string
    content: string
    createdAt?: Date | string
  }

  export type TripMessageCreateOrConnectWithoutTripInput = {
    where: TripMessageWhereUniqueInput
    create: XOR<TripMessageCreateWithoutTripInput, TripMessageUncheckedCreateWithoutTripInput>
  }

  export type TripMessageCreateManyTripInputEnvelope = {
    data: TripMessageCreateManyTripInput | TripMessageCreateManyTripInput[]
    skipDuplicates?: boolean
  }

  export type CollaboratorUpsertWithWhereUniqueWithoutTripInput = {
    where: CollaboratorWhereUniqueInput
    update: XOR<CollaboratorUpdateWithoutTripInput, CollaboratorUncheckedUpdateWithoutTripInput>
    create: XOR<CollaboratorCreateWithoutTripInput, CollaboratorUncheckedCreateWithoutTripInput>
  }

  export type CollaboratorUpdateWithWhereUniqueWithoutTripInput = {
    where: CollaboratorWhereUniqueInput
    data: XOR<CollaboratorUpdateWithoutTripInput, CollaboratorUncheckedUpdateWithoutTripInput>
  }

  export type CollaboratorUpdateManyWithWhereWithoutTripInput = {
    where: CollaboratorScalarWhereInput
    data: XOR<CollaboratorUpdateManyMutationInput, CollaboratorUncheckedUpdateManyWithoutTripInput>
  }

  export type ItineraryItemUpsertWithWhereUniqueWithoutTripInput = {
    where: ItineraryItemWhereUniqueInput
    update: XOR<ItineraryItemUpdateWithoutTripInput, ItineraryItemUncheckedUpdateWithoutTripInput>
    create: XOR<ItineraryItemCreateWithoutTripInput, ItineraryItemUncheckedCreateWithoutTripInput>
  }

  export type ItineraryItemUpdateWithWhereUniqueWithoutTripInput = {
    where: ItineraryItemWhereUniqueInput
    data: XOR<ItineraryItemUpdateWithoutTripInput, ItineraryItemUncheckedUpdateWithoutTripInput>
  }

  export type ItineraryItemUpdateManyWithWhereWithoutTripInput = {
    where: ItineraryItemScalarWhereInput
    data: XOR<ItineraryItemUpdateManyMutationInput, ItineraryItemUncheckedUpdateManyWithoutTripInput>
  }

  export type ItineraryItemScalarWhereInput = {
    AND?: ItineraryItemScalarWhereInput | ItineraryItemScalarWhereInput[]
    OR?: ItineraryItemScalarWhereInput[]
    NOT?: ItineraryItemScalarWhereInput | ItineraryItemScalarWhereInput[]
    id?: StringFilter<"ItineraryItem"> | string
    tripId?: StringFilter<"ItineraryItem"> | string
    day?: IntFilter<"ItineraryItem"> | number
    position?: FloatFilter<"ItineraryItem"> | number
    type?: StringFilter<"ItineraryItem"> | string
    time?: StringFilter<"ItineraryItem"> | string
    activity?: StringFilter<"ItineraryItem"> | string
    location?: StringFilter<"ItineraryItem"> | string
    lat?: FloatNullableFilter<"ItineraryItem"> | number | null
    lng?: FloatNullableFilter<"ItineraryItem"> | number | null
    durationMinutes?: IntFilter<"ItineraryItem"> | number
    estimatedCost?: IntFilter<"ItineraryItem"> | number
    category?: StringFilter<"ItineraryItem"> | string
    notes?: StringNullableFilter<"ItineraryItem"> | string | null
    travelTimeFromPrevious?: IntNullableFilter<"ItineraryItem"> | number | null
    hasTimingConflict?: BoolFilter<"ItineraryItem"> | boolean
    createdAt?: DateTimeFilter<"ItineraryItem"> | Date | string
  }

  export type HotelUpsertWithWhereUniqueWithoutTripInput = {
    where: HotelWhereUniqueInput
    update: XOR<HotelUpdateWithoutTripInput, HotelUncheckedUpdateWithoutTripInput>
    create: XOR<HotelCreateWithoutTripInput, HotelUncheckedCreateWithoutTripInput>
  }

  export type HotelUpdateWithWhereUniqueWithoutTripInput = {
    where: HotelWhereUniqueInput
    data: XOR<HotelUpdateWithoutTripInput, HotelUncheckedUpdateWithoutTripInput>
  }

  export type HotelUpdateManyWithWhereWithoutTripInput = {
    where: HotelScalarWhereInput
    data: XOR<HotelUpdateManyMutationInput, HotelUncheckedUpdateManyWithoutTripInput>
  }

  export type HotelScalarWhereInput = {
    AND?: HotelScalarWhereInput | HotelScalarWhereInput[]
    OR?: HotelScalarWhereInput[]
    NOT?: HotelScalarWhereInput | HotelScalarWhereInput[]
    id?: StringFilter<"Hotel"> | string
    tripId?: StringFilter<"Hotel"> | string
    name?: StringFilter<"Hotel"> | string
    address?: StringFilter<"Hotel"> | string
    zone?: StringFilter<"Hotel"> | string
    checkinDay?: IntFilter<"Hotel"> | number
    checkoutDay?: IntFilter<"Hotel"> | number
    checkinDate?: DateTimeFilter<"Hotel"> | Date | string
    checkoutDate?: DateTimeFilter<"Hotel"> | Date | string
    rating?: FloatNullableFilter<"Hotel"> | number | null
    priceRange?: StringNullableFilter<"Hotel"> | string | null
    photoUrl?: StringNullableFilter<"Hotel"> | string | null
    googlePlaceId?: StringNullableFilter<"Hotel"> | string | null
    mapsUrl?: StringNullableFilter<"Hotel"> | string | null
    saved?: BoolFilter<"Hotel"> | boolean
  }

  export type TripMessageUpsertWithWhereUniqueWithoutTripInput = {
    where: TripMessageWhereUniqueInput
    update: XOR<TripMessageUpdateWithoutTripInput, TripMessageUncheckedUpdateWithoutTripInput>
    create: XOR<TripMessageCreateWithoutTripInput, TripMessageUncheckedCreateWithoutTripInput>
  }

  export type TripMessageUpdateWithWhereUniqueWithoutTripInput = {
    where: TripMessageWhereUniqueInput
    data: XOR<TripMessageUpdateWithoutTripInput, TripMessageUncheckedUpdateWithoutTripInput>
  }

  export type TripMessageUpdateManyWithWhereWithoutTripInput = {
    where: TripMessageScalarWhereInput
    data: XOR<TripMessageUpdateManyMutationInput, TripMessageUncheckedUpdateManyWithoutTripInput>
  }

  export type TripMessageScalarWhereInput = {
    AND?: TripMessageScalarWhereInput | TripMessageScalarWhereInput[]
    OR?: TripMessageScalarWhereInput[]
    NOT?: TripMessageScalarWhereInput | TripMessageScalarWhereInput[]
    id?: StringFilter<"TripMessage"> | string
    tripId?: StringFilter<"TripMessage"> | string
    userId?: StringFilter<"TripMessage"> | string
    userName?: StringFilter<"TripMessage"> | string
    content?: StringFilter<"TripMessage"> | string
    createdAt?: DateTimeFilter<"TripMessage"> | Date | string
  }

  export type TripCreateWithoutCollaboratorsInput = {
    id?: string
    name: string
    destination: string
    startDate: Date | string
    endDate: Date | string
    travelers: number
    originCity: string
    transportMode: string
    estimatedTravelHours: number
    createdAt?: Date | string
    shareToken?: string
    tripCode?: string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    items?: ItineraryItemCreateNestedManyWithoutTripInput
    hotels?: HotelCreateNestedManyWithoutTripInput
    messages?: TripMessageCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateWithoutCollaboratorsInput = {
    id?: string
    name: string
    destination: string
    startDate: Date | string
    endDate: Date | string
    travelers: number
    originCity: string
    transportMode: string
    estimatedTravelHours: number
    createdAt?: Date | string
    shareToken?: string
    tripCode?: string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    items?: ItineraryItemUncheckedCreateNestedManyWithoutTripInput
    hotels?: HotelUncheckedCreateNestedManyWithoutTripInput
    messages?: TripMessageUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripCreateOrConnectWithoutCollaboratorsInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutCollaboratorsInput, TripUncheckedCreateWithoutCollaboratorsInput>
  }

  export type UserCreateWithoutTripsInput = {
    id?: string
    email: string
    password: string
    name: string
    travelStyle: string
    pace: string
    budgetRange: string
    currency?: string
    distanceUnit?: string
    theme?: string
    emailAlerts?: boolean
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutTripsInput = {
    id?: string
    email: string
    password: string
    name: string
    travelStyle: string
    pace: string
    budgetRange: string
    currency?: string
    distanceUnit?: string
    theme?: string
    emailAlerts?: boolean
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutTripsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTripsInput, UserUncheckedCreateWithoutTripsInput>
  }

  export type TripUpsertWithoutCollaboratorsInput = {
    update: XOR<TripUpdateWithoutCollaboratorsInput, TripUncheckedUpdateWithoutCollaboratorsInput>
    create: XOR<TripCreateWithoutCollaboratorsInput, TripUncheckedCreateWithoutCollaboratorsInput>
    where?: TripWhereInput
  }

  export type TripUpdateToOneWithWhereWithoutCollaboratorsInput = {
    where?: TripWhereInput
    data: XOR<TripUpdateWithoutCollaboratorsInput, TripUncheckedUpdateWithoutCollaboratorsInput>
  }

  export type TripUpdateWithoutCollaboratorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    travelers?: IntFieldUpdateOperationsInput | number
    originCity?: StringFieldUpdateOperationsInput | string
    transportMode?: StringFieldUpdateOperationsInput | string
    estimatedTravelHours?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    tripCode?: NullableStringFieldUpdateOperationsInput | string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    items?: ItineraryItemUpdateManyWithoutTripNestedInput
    hotels?: HotelUpdateManyWithoutTripNestedInput
    messages?: TripMessageUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateWithoutCollaboratorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    travelers?: IntFieldUpdateOperationsInput | number
    originCity?: StringFieldUpdateOperationsInput | string
    transportMode?: StringFieldUpdateOperationsInput | string
    estimatedTravelHours?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    tripCode?: NullableStringFieldUpdateOperationsInput | string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    items?: ItineraryItemUncheckedUpdateManyWithoutTripNestedInput
    hotels?: HotelUncheckedUpdateManyWithoutTripNestedInput
    messages?: TripMessageUncheckedUpdateManyWithoutTripNestedInput
  }

  export type UserUpsertWithoutTripsInput = {
    update: XOR<UserUpdateWithoutTripsInput, UserUncheckedUpdateWithoutTripsInput>
    create: XOR<UserCreateWithoutTripsInput, UserUncheckedCreateWithoutTripsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTripsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTripsInput, UserUncheckedUpdateWithoutTripsInput>
  }

  export type UserUpdateWithoutTripsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    travelStyle?: StringFieldUpdateOperationsInput | string
    pace?: StringFieldUpdateOperationsInput | string
    budgetRange?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    distanceUnit?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    emailAlerts?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutTripsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    travelStyle?: StringFieldUpdateOperationsInput | string
    pace?: StringFieldUpdateOperationsInput | string
    budgetRange?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    distanceUnit?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    emailAlerts?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripCreateWithoutItemsInput = {
    id?: string
    name: string
    destination: string
    startDate: Date | string
    endDate: Date | string
    travelers: number
    originCity: string
    transportMode: string
    estimatedTravelHours: number
    createdAt?: Date | string
    shareToken?: string
    tripCode?: string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorCreateNestedManyWithoutTripInput
    hotels?: HotelCreateNestedManyWithoutTripInput
    messages?: TripMessageCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateWithoutItemsInput = {
    id?: string
    name: string
    destination: string
    startDate: Date | string
    endDate: Date | string
    travelers: number
    originCity: string
    transportMode: string
    estimatedTravelHours: number
    createdAt?: Date | string
    shareToken?: string
    tripCode?: string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorUncheckedCreateNestedManyWithoutTripInput
    hotels?: HotelUncheckedCreateNestedManyWithoutTripInput
    messages?: TripMessageUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripCreateOrConnectWithoutItemsInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutItemsInput, TripUncheckedCreateWithoutItemsInput>
  }

  export type TripUpsertWithoutItemsInput = {
    update: XOR<TripUpdateWithoutItemsInput, TripUncheckedUpdateWithoutItemsInput>
    create: XOR<TripCreateWithoutItemsInput, TripUncheckedCreateWithoutItemsInput>
    where?: TripWhereInput
  }

  export type TripUpdateToOneWithWhereWithoutItemsInput = {
    where?: TripWhereInput
    data: XOR<TripUpdateWithoutItemsInput, TripUncheckedUpdateWithoutItemsInput>
  }

  export type TripUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    travelers?: IntFieldUpdateOperationsInput | number
    originCity?: StringFieldUpdateOperationsInput | string
    transportMode?: StringFieldUpdateOperationsInput | string
    estimatedTravelHours?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    tripCode?: NullableStringFieldUpdateOperationsInput | string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorUpdateManyWithoutTripNestedInput
    hotels?: HotelUpdateManyWithoutTripNestedInput
    messages?: TripMessageUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    travelers?: IntFieldUpdateOperationsInput | number
    originCity?: StringFieldUpdateOperationsInput | string
    transportMode?: StringFieldUpdateOperationsInput | string
    estimatedTravelHours?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    tripCode?: NullableStringFieldUpdateOperationsInput | string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorUncheckedUpdateManyWithoutTripNestedInput
    hotels?: HotelUncheckedUpdateManyWithoutTripNestedInput
    messages?: TripMessageUncheckedUpdateManyWithoutTripNestedInput
  }

  export type TripCreateWithoutHotelsInput = {
    id?: string
    name: string
    destination: string
    startDate: Date | string
    endDate: Date | string
    travelers: number
    originCity: string
    transportMode: string
    estimatedTravelHours: number
    createdAt?: Date | string
    shareToken?: string
    tripCode?: string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorCreateNestedManyWithoutTripInput
    items?: ItineraryItemCreateNestedManyWithoutTripInput
    messages?: TripMessageCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateWithoutHotelsInput = {
    id?: string
    name: string
    destination: string
    startDate: Date | string
    endDate: Date | string
    travelers: number
    originCity: string
    transportMode: string
    estimatedTravelHours: number
    createdAt?: Date | string
    shareToken?: string
    tripCode?: string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorUncheckedCreateNestedManyWithoutTripInput
    items?: ItineraryItemUncheckedCreateNestedManyWithoutTripInput
    messages?: TripMessageUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripCreateOrConnectWithoutHotelsInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutHotelsInput, TripUncheckedCreateWithoutHotelsInput>
  }

  export type TripUpsertWithoutHotelsInput = {
    update: XOR<TripUpdateWithoutHotelsInput, TripUncheckedUpdateWithoutHotelsInput>
    create: XOR<TripCreateWithoutHotelsInput, TripUncheckedCreateWithoutHotelsInput>
    where?: TripWhereInput
  }

  export type TripUpdateToOneWithWhereWithoutHotelsInput = {
    where?: TripWhereInput
    data: XOR<TripUpdateWithoutHotelsInput, TripUncheckedUpdateWithoutHotelsInput>
  }

  export type TripUpdateWithoutHotelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    travelers?: IntFieldUpdateOperationsInput | number
    originCity?: StringFieldUpdateOperationsInput | string
    transportMode?: StringFieldUpdateOperationsInput | string
    estimatedTravelHours?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    tripCode?: NullableStringFieldUpdateOperationsInput | string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorUpdateManyWithoutTripNestedInput
    items?: ItineraryItemUpdateManyWithoutTripNestedInput
    messages?: TripMessageUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateWithoutHotelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    travelers?: IntFieldUpdateOperationsInput | number
    originCity?: StringFieldUpdateOperationsInput | string
    transportMode?: StringFieldUpdateOperationsInput | string
    estimatedTravelHours?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    tripCode?: NullableStringFieldUpdateOperationsInput | string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorUncheckedUpdateManyWithoutTripNestedInput
    items?: ItineraryItemUncheckedUpdateManyWithoutTripNestedInput
    messages?: TripMessageUncheckedUpdateManyWithoutTripNestedInput
  }

  export type TripCreateWithoutMessagesInput = {
    id?: string
    name: string
    destination: string
    startDate: Date | string
    endDate: Date | string
    travelers: number
    originCity: string
    transportMode: string
    estimatedTravelHours: number
    createdAt?: Date | string
    shareToken?: string
    tripCode?: string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorCreateNestedManyWithoutTripInput
    items?: ItineraryItemCreateNestedManyWithoutTripInput
    hotels?: HotelCreateNestedManyWithoutTripInput
  }

  export type TripUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    destination: string
    startDate: Date | string
    endDate: Date | string
    travelers: number
    originCity: string
    transportMode: string
    estimatedTravelHours: number
    createdAt?: Date | string
    shareToken?: string
    tripCode?: string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorUncheckedCreateNestedManyWithoutTripInput
    items?: ItineraryItemUncheckedCreateNestedManyWithoutTripInput
    hotels?: HotelUncheckedCreateNestedManyWithoutTripInput
  }

  export type TripCreateOrConnectWithoutMessagesInput = {
    where: TripWhereUniqueInput
    create: XOR<TripCreateWithoutMessagesInput, TripUncheckedCreateWithoutMessagesInput>
  }

  export type TripUpsertWithoutMessagesInput = {
    update: XOR<TripUpdateWithoutMessagesInput, TripUncheckedUpdateWithoutMessagesInput>
    create: XOR<TripCreateWithoutMessagesInput, TripUncheckedCreateWithoutMessagesInput>
    where?: TripWhereInput
  }

  export type TripUpdateToOneWithWhereWithoutMessagesInput = {
    where?: TripWhereInput
    data: XOR<TripUpdateWithoutMessagesInput, TripUncheckedUpdateWithoutMessagesInput>
  }

  export type TripUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    travelers?: IntFieldUpdateOperationsInput | number
    originCity?: StringFieldUpdateOperationsInput | string
    transportMode?: StringFieldUpdateOperationsInput | string
    estimatedTravelHours?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    tripCode?: NullableStringFieldUpdateOperationsInput | string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorUpdateManyWithoutTripNestedInput
    items?: ItineraryItemUpdateManyWithoutTripNestedInput
    hotels?: HotelUpdateManyWithoutTripNestedInput
  }

  export type TripUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    travelers?: IntFieldUpdateOperationsInput | number
    originCity?: StringFieldUpdateOperationsInput | string
    transportMode?: StringFieldUpdateOperationsInput | string
    estimatedTravelHours?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shareToken?: StringFieldUpdateOperationsInput | string
    tripCode?: NullableStringFieldUpdateOperationsInput | string | null
    dailySummaries?: NullableJsonNullValueInput | InputJsonValue
    collaborators?: CollaboratorUncheckedUpdateManyWithoutTripNestedInput
    items?: ItineraryItemUncheckedUpdateManyWithoutTripNestedInput
    hotels?: HotelUncheckedUpdateManyWithoutTripNestedInput
  }

  export type CollaboratorCreateManyUserInput = {
    id?: string
    tripId: string
    role: string
  }

  export type CollaboratorUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    trip?: TripUpdateOneRequiredWithoutCollaboratorsNestedInput
  }

  export type CollaboratorUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type CollaboratorUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tripId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type CollaboratorCreateManyTripInput = {
    id?: string
    userId: string
    role: string
  }

  export type ItineraryItemCreateManyTripInput = {
    id?: string
    day: number
    position: number
    type?: string
    time: string
    activity: string
    location: string
    lat?: number | null
    lng?: number | null
    durationMinutes: number
    estimatedCost: number
    category: string
    notes?: string | null
    travelTimeFromPrevious?: number | null
    hasTimingConflict?: boolean
    createdAt?: Date | string
  }

  export type HotelCreateManyTripInput = {
    id?: string
    name: string
    address: string
    zone: string
    checkinDay: number
    checkoutDay: number
    checkinDate: Date | string
    checkoutDate: Date | string
    rating?: number | null
    priceRange?: string | null
    photoUrl?: string | null
    googlePlaceId?: string | null
    mapsUrl?: string | null
    saved?: boolean
  }

  export type TripMessageCreateManyTripInput = {
    id?: string
    userId: string
    userName: string
    content: string
    createdAt?: Date | string
  }

  export type CollaboratorUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTripsNestedInput
  }

  export type CollaboratorUncheckedUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type CollaboratorUncheckedUpdateManyWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type ItineraryItemUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: IntFieldUpdateOperationsInput | number
    position?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    estimatedCost?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    travelTimeFromPrevious?: NullableIntFieldUpdateOperationsInput | number | null
    hasTimingConflict?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItineraryItemUncheckedUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: IntFieldUpdateOperationsInput | number
    position?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    estimatedCost?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    travelTimeFromPrevious?: NullableIntFieldUpdateOperationsInput | number | null
    hasTimingConflict?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItineraryItemUncheckedUpdateManyWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: IntFieldUpdateOperationsInput | number
    position?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMinutes?: IntFieldUpdateOperationsInput | number
    estimatedCost?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    travelTimeFromPrevious?: NullableIntFieldUpdateOperationsInput | number | null
    hasTimingConflict?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HotelUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    checkinDay?: IntFieldUpdateOperationsInput | number
    checkoutDay?: IntFieldUpdateOperationsInput | number
    checkinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkoutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    priceRange?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: NullableStringFieldUpdateOperationsInput | string | null
    mapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    saved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HotelUncheckedUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    checkinDay?: IntFieldUpdateOperationsInput | number
    checkoutDay?: IntFieldUpdateOperationsInput | number
    checkinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkoutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    priceRange?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: NullableStringFieldUpdateOperationsInput | string | null
    mapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    saved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HotelUncheckedUpdateManyWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    checkinDay?: IntFieldUpdateOperationsInput | number
    checkoutDay?: IntFieldUpdateOperationsInput | number
    checkinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    checkoutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    priceRange?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googlePlaceId?: NullableStringFieldUpdateOperationsInput | string | null
    mapsUrl?: NullableStringFieldUpdateOperationsInput | string | null
    saved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TripMessageUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripMessageUncheckedUpdateWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TripMessageUncheckedUpdateManyWithoutTripInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}