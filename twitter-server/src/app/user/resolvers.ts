import axios from "axios";
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";

interface GoogleTokenResult {
  iss?: string;
  nbf?: string;
  aud?: string;
  sub?: string;
  hd?: string;
  email?: string;
  email_verified: string;
  azp?: string;
  name?: string;
  picture?: string;
  given_name: string;
  family_name?: string;
  iat?: string;
  exp?: string;
  jti?: string;
  typ?: string;
}

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleToken = token;
    const googleAuthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleAuthURL.searchParams.set("id_token", googleToken);

    const { data } = await axios.get<GoogleTokenResult>(googleAuthURL.toString(), {
      responseType: "json",
    });

    const checkUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!checkUser) {
      await prismaClient.user.create({
        data: {
          email: data.email || "",
          firstName: data.given_name,
          lastName: data.family_name,
          profileImageUrl: data.picture,
        },
      });
    }

    const userInDb = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!userInDb) {
      throw new Error("User not found");
    } else {
      const userToken = JWTService.generateToken(userInDb);
      return userToken;
    }
  },
};

export const resolvers = { queries };
