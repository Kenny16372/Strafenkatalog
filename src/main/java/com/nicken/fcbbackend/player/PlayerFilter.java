package com.nicken.fcbbackend.player;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Order(1)
@Component
public class PlayerFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        var httpServletRequest = (HttpServletRequest) servletRequest;
        var httpServletResponse = (HttpServletResponse) servletResponse;

        boolean hasId = httpServletRequest.getParameter("id") != null;
        boolean hasName = httpServletRequest.getParameter("name") != null;

        boolean badRequest = false;

        switch (httpServletRequest.getMethod()) {
            case "GET":
            case "POST":
                badRequest = false;
                break;
            case "PUT":
                badRequest = !hasId || !hasName;
                break;
            case "DELETE":
                badRequest = !hasId;
                break;
            default:
                badRequest = true;
                break;
        }
        if (badRequest) {
            httpServletResponse.setStatus(HttpStatus.BAD_REQUEST.value());
            httpServletResponse.getOutputStream().flush();
            return;
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

}
