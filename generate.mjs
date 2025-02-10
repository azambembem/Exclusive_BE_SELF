// bu code
// env ichidagi bismillah bn bismillah_refresh ni hashlab beradi.
import crypto from "crypto";

console.log(crypto.createHash("sha256").update("bismillah").digest("hex"));

console.log(
  crypto.createHash("sha256").update("bismillah_refresh").digest("hex")
);
