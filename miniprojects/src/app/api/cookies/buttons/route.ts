// import { NextResponse, NextRequest } from "next/server";
// import { cookies } from "next/headers";

// export async function GET(request: NextRequest) {
//     const oneDay = 24 * 60 * 60 * 1000;

//     cookies().set("name", "Vlad", {
//         expires: Date.now() - oneDay,
//     });

//     const cookieVal = cookies().get("name")?.value;

//     return NextResponse.json(
//         {
//             cookieVal,
//             cookies: request.cookies.getAll(),
//             success: true,
//         },
//         {
//             status: 200,
//         }
//     );
// }