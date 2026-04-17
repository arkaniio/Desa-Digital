"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.7.0",
    "engineVersion": "75cbdc1eb7150937890ad5465d861175c6624711",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel User {\n  id         Int        @id @default(autoincrement())\n  Username   String     @unique\n  Email      String     @unique\n  Password   String\n  Role       String     @default(\"USER\")\n  Created_at DateTime   @default(now())\n  Updated_at DateTime   @updatedAt\n  identities Identity[]\n}\n\nenum Role {\n  ADMIN\n  USER\n}\n\nmodel Identity {\n  id         Int      @id @default(autoincrement())\n  User_Id    Int\n  User       User     @relation(fields: [User_Id], references: [id])\n  Full_Name  String   @unique\n  Age        Int\n  Adress     String\n  Created_at DateTime @default(now())\n  Updated_at DateTime @default(now())\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"Username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"Email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"Password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"Role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"Created_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"Updated_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"identities\",\"kind\":\"object\",\"type\":\"Identity\",\"relationName\":\"IdentityToUser\"}],\"dbName\":null},\"Identity\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"User_Id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"User\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"IdentityToUser\"},{\"name\":\"Full_Name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"Age\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"Adress\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"Created_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"Updated_at\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"User\",\"identities\",\"_count\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"Identity.findUnique\",\"Identity.findUniqueOrThrow\",\"Identity.findFirst\",\"Identity.findFirstOrThrow\",\"Identity.findMany\",\"Identity.createOne\",\"Identity.createMany\",\"Identity.createManyAndReturn\",\"Identity.updateOne\",\"Identity.updateMany\",\"Identity.updateManyAndReturn\",\"Identity.upsertOne\",\"Identity.deleteOne\",\"Identity.deleteMany\",\"Identity.groupBy\",\"Identity.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"User_Id\",\"Full_Name\",\"Age\",\"Adress\",\"Created_at\",\"Updated_at\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"Username\",\"Email\",\"Password\",\"Role\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "bBYgCwQAAEUAIC4AAEEAMC8AAAkAEDAAAEEAMDECAAAAATZAAEQAITdAAEQAIUMBAAAAAUQBAAAAAUUBAEMAIUYBAEMAIQEAAAABACALAwAARwAgLgAARgAwLwAAAwAQMAAARgAwMQIAQgAhMgIAQgAhMwEAQwAhNAIAQgAhNQEAQwAhNkAARAAhN0AARAAhAQMAAGYAIAsDAABHACAuAABGADAvAAADABAwAABGADAxAgAAAAEyAgBCACEzAQAAAAE0AgBCACE1AQBDACE2QABEACE3QABEACEDAAAAAwAgAQAABAAwAgAABQAgAQAAAAMAIAEAAAABACALBAAARQAgLgAAQQAwLwAACQAQMAAAQQAwMQIAQgAhNkAARAAhN0AARAAhQwEAQwAhRAEAQwAhRQEAQwAhRgEAQwAhAQQAAGUAIAMAAAAJACABAAAKADACAAABACADAAAACQAgAQAACgAwAgAAAQAgAwAAAAkAIAEAAAoAMAIAAAEAIAgEAABkACAxAgAAAAE2QAAAAAE3QAAAAAFDAQAAAAFEAQAAAAFFAQAAAAFGAQAAAAEBCwAADgAgBzECAAAAATZAAAAAATdAAAAAAUMBAAAAAUQBAAAAAUUBAAAAAUYBAAAAAQELAAAQADABCwAAEAAwCAQAAFcAIDECAE4AITZAAE8AITdAAE8AIUMBAE0AIUQBAE0AIUUBAE0AIUYBAE0AIQIAAAABACALAAATACAHMQIATgAhNkAATwAhN0AATwAhQwEATQAhRAEATQAhRQEATQAhRgEATQAhAgAAAAkAIAsAABUAIAIAAAAJACALAAAVACADAAAAAQAgEgAADgAgEwAAEwAgAQAAAAEAIAEAAAAJACAFBQAAUgAgGAAAUwAgGQAAVgAgGgAAVQAgGwAAVAAgCi4AAEAAMC8AABwAEDAAAEAAMDECADYAITZAADgAITdAADgAIUMBADcAIUQBADcAIUUBADcAIUYBADcAIQMAAAAJACABAAAbADAXAAAcACADAAAACQAgAQAACgAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAIAwAAUQAgMQIAAAABMgIAAAABMwEAAAABNAIAAAABNQEAAAABNkAAAAABN0AAAAABAQsAACQAIAcxAgAAAAEyAgAAAAEzAQAAAAE0AgAAAAE1AQAAAAE2QAAAAAE3QAAAAAEBCwAAJgAwAQsAACYAMAgDAABQACAxAgBOACEyAgBOACEzAQBNACE0AgBOACE1AQBNACE2QABPACE3QABPACECAAAABQAgCwAAKQAgBzECAE4AITICAE4AITMBAE0AITQCAE4AITUBAE0AITZAAE8AITdAAE8AIQIAAAADACALAAArACACAAAAAwAgCwAAKwAgAwAAAAUAIBIAACQAIBMAACkAIAEAAAAFACABAAAAAwAgBQUAAEgAIBgAAEkAIBkAAEwAIBoAAEsAIBsAAEoAIAouAAA1ADAvAAAyABAwAAA1ADAxAgA2ACEyAgA2ACEzAQA3ACE0AgA2ACE1AQA3ACE2QAA4ACE3QAA4ACEDAAAAAwAgAQAAMQAwFwAAMgAgAwAAAAMAIAEAAAQAMAIAAAUAIAouAAA1ADAvAAAyABAwAAA1ADAxAgA2ACEyAgA2ACEzAQA3ACE0AgA2ACE1AQA3ACE2QAA4ACE3QAA4ACENBQAAOgAgGAAAPwAgGQAAOgAgGgAAOgAgGwAAOgAgOAIAAAABOQIAAAAEOgIAAAAEOwIAAAABPAIAAAABPQIAAAABPgIAAAABPwIAPgAhDgUAADoAIBoAAD0AIBsAAD0AIDgBAAAAATkBAAAABDoBAAAABDsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BADwAIUABAAAAAUEBAAAAAUIBAAAAAQsFAAA6ACAaAAA7ACAbAAA7ACA4QAAAAAE5QAAAAAQ6QAAAAAQ7QAAAAAE8QAAAAAE9QAAAAAE-QAAAAAE_QAA5ACELBQAAOgAgGgAAOwAgGwAAOwAgOEAAAAABOUAAAAAEOkAAAAAEO0AAAAABPEAAAAABPUAAAAABPkAAAAABP0AAOQAhCDgCAAAAATkCAAAABDoCAAAABDsCAAAAATwCAAAAAT0CAAAAAT4CAAAAAT8CADoAIQg4QAAAAAE5QAAAAAQ6QAAAAAQ7QAAAAAE8QAAAAAE9QAAAAAE-QAAAAAE_QAA7ACEOBQAAOgAgGgAAPQAgGwAAPQAgOAEAAAABOQEAAAAEOgEAAAAEOwEAAAABPAEAAAABPQEAAAABPgEAAAABPwEAPAAhQAEAAAABQQEAAAABQgEAAAABCzgBAAAAATkBAAAABDoBAAAABDsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAD0AIUABAAAAAUEBAAAAAUIBAAAAAQ0FAAA6ACAYAAA_ACAZAAA6ACAaAAA6ACAbAAA6ACA4AgAAAAE5AgAAAAQ6AgAAAAQ7AgAAAAE8AgAAAAE9AgAAAAE-AgAAAAE_AgA-ACEIOAgAAAABOQgAAAAEOggAAAAEOwgAAAABPAgAAAABPQgAAAABPggAAAABPwgAPwAhCi4AAEAAMC8AABwAEDAAAEAAMDECADYAITZAADgAITdAADgAIUMBADcAIUQBADcAIUUBADcAIUYBADcAIQsEAABFACAuAABBADAvAAAJABAwAABBADAxAgBCACE2QABEACE3QABEACFDAQBDACFEAQBDACFFAQBDACFGAQBDACEIOAIAAAABOQIAAAAEOgIAAAAEOwIAAAABPAIAAAABPQIAAAABPgIAAAABPwIAOgAhCzgBAAAAATkBAAAABDoBAAAABDsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAD0AIUABAAAAAUEBAAAAAUIBAAAAAQg4QAAAAAE5QAAAAAQ6QAAAAAQ7QAAAAAE8QAAAAAE9QAAAAAE-QAAAAAE_QAA7ACEDRwAAAwAgSAAAAwAgSQAAAwAgCwMAAEcAIC4AAEYAMC8AAAMAEDAAAEYAMDECAEIAITICAEIAITMBAEMAITQCAEIAITUBAEMAITZAAEQAITdAAEQAIQ0EAABFACAuAABBADAvAAAJABAwAABBADAxAgBCACE2QABEACE3QABEACFDAQBDACFEAQBDACFFAQBDACFGAQBDACFKAAAJACBLAAAJACAAAAAAAAFPAQAAAAEFTwIAAAABVQIAAAABVgIAAAABVwIAAAABWAIAAAABAU9AAAAAAQUSAABoACATAABrACBMAABpACBNAABqACBSAAABACADEgAAaAAgTAAAaQAgUgAAAQAgAAAAAAALEgAAWAAwEwAAXQAwTAAAWQAwTQAAWgAwTgAAWwAgTwAAXAAwUAAAXAAwUQAAXAAwUgAAXAAwUwAAXgAwVAAAXwAwBjECAAAAATMBAAAAATQCAAAAATUBAAAAATZAAAAAATdAAAAAAQIAAAAFACASAABjACADAAAABQAgEgAAYwAgEwAAYgAgAQsAAGcAMAsDAABHACAuAABGADAvAAADABAwAABGADAxAgAAAAEyAgBCACEzAQAAAAE0AgBCACE1AQBDACE2QABEACE3QABEACECAAAABQAgCwAAYgAgAgAAAGAAIAsAAGEAIAouAABfADAvAABgABAwAABfADAxAgBCACEyAgBCACEzAQBDACE0AgBCACE1AQBDACE2QABEACE3QABEACEKLgAAXwAwLwAAYAAQMAAAXwAwMQIAQgAhMgIAQgAhMwEAQwAhNAIAQgAhNQEAQwAhNkAARAAhN0AARAAhBjECAE4AITMBAE0AITQCAE4AITUBAE0AITZAAE8AITdAAE8AIQYxAgBOACEzAQBNACE0AgBOACE1AQBNACE2QABPACE3QABPACEGMQIAAAABMwEAAAABNAIAAAABNQEAAAABNkAAAAABN0AAAAABBBIAAFgAMEwAAFkAME4AAFsAIFIAAFwAMAABBAAAZQAgBjECAAAAATMBAAAAATQCAAAAATUBAAAAATZAAAAAATdAAAAAAQcxAgAAAAE2QAAAAAE3QAAAAAFDAQAAAAFEAQAAAAFFAQAAAAFGAQAAAAECAAAAAQAgEgAAaAAgAwAAAAkAIBIAAGgAIBMAAGwAIAkAAAAJACALAABsACAxAgBOACE2QABPACE3QABPACFDAQBNACFEAQBNACFFAQBNACFGAQBNACEHMQIATgAhNkAATwAhN0AATwAhQwEATQAhRAEATQAhRQEATQAhRgEATQAhAgQGAgUAAwEDAAEBBAcAAAAABQUACBgACRkAChoACxsADAAAAAAABQUACBgACRkAChoACxsADAEDAAEBAwABBQUAERgAEhkAExoAFBsAFQAAAAAABQUAERgAEhkAExoAFBsAFQYCAQcIAQgLAQkMAQoNAQwPAQ0RBA4SBQ8UARAWBBEXBhQYARUZARYaBBwdBx0eDR4fAh8gAiAhAiEiAiIjAiMlAiQnBCUoDiYqAicsBCgtDykuAiovAiswBCwzEC00Fg"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map