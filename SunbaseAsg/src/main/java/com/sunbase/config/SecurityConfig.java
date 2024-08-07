package com.sunbase.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.sunbase.jwt.JwtAuthenticationEntryPoint;
import com.sunbase.jwt.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {
	
	private final UserDetailsService userDetailsService;
	private final PasswordEncoder passwordEncoder;
	private final JwtAuthenticationEntryPoint point;
	private final JwtAuthenticationFilter filter;
	
	public SecurityConfig(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder, JwtAuthenticationEntryPoint point, JwtAuthenticationFilter filter) {
		this.userDetailsService = userDetailsService;
		this.passwordEncoder = passwordEncoder;
		this.point = point;
		this.filter = filter;
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .authorizeHttpRequests(requests -> requests
                                .requestMatchers(
                                        "/users/register",
                                        "/add_customer",
                                        "/users/login",
                                        "/login.html",
                                        "/index.html",
                                        "/CSS/**",
                                        "/JS/**",
                                        "/signup.html",
                                        "/login",
                                        "/signup",
                                        "/token",
                                        "/home",
                                        "/users/verify-token",
                                        "/customers",
                                        "/editCustomer/**",
                                        "/api/save_customer",
                                        "/api/deleteCustomer/**",
                                        "/api/**"
                                ).permitAll()
                                .requestMatchers(
                                        "/all_users"
                                ).authenticated()
                )
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

	    return http.build();
	}

	@Bean
	public DaoAuthenticationProvider daoAuthenticationProvider() {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setUserDetailsService(userDetailsService);
		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
		return daoAuthenticationProvider;
	}
}
