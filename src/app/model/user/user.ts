import { Role } from "../rol/role.model";
import { UserCredentials } from "./user-credentials";

export interface User extends UserCredentials {

    name: string;
    birthDay: string;
    roles: Set<Role>;
}
