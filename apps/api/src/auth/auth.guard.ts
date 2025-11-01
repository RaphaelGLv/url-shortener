import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_OPTIONAL_AUTH_KEY } from "src/decorators/optional-auth.decorator";
import { IS_PUBLIC_KEY } from "src/decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const isOptionalAuth = this.reflector.getAllAndOverride<boolean>(IS_OPTIONAL_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!token && isOptionalAuth) {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException("Invalid or missing token");
    }


    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow<string>("JWT_SECRET"),
      });
      request["user"] = {userId: payload.sub, email: payload.email};
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null;
    }
    const [type, token] = authHeader.split(" ");
    return type === "Bearer" ? token : null;
  }
}
