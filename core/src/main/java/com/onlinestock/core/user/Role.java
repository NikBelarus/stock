package com.onlinestock.core.user;

import org.springframework.security.core.GrantedAuthority;

public enum Role  implements GrantedAuthority {
    SYSTEM_ADMIN,
    STOCK_ADMIN,
    STOCK_DISPATCHER,
    STOCK_MANAGER,
    CONTROLLER,
    STOCK_OWNER;

    @Override
    public String getAuthority() {
        return name();
    }
}
