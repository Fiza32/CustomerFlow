package com.sunbase.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PageController {

    @GetMapping("/login")
    public String showLoginPage() {
    	// this resolves to src/main/resources/static/login.html
        return "login";
    }

    @GetMapping("/signup")
    public String showSignupPage() {
        return "signup";
    }

    @GetMapping("/token")
    public String showTokenPage() {
        return "token";
    }

    @GetMapping("/")
    public String main() {
        return "index";
    }
    
    @GetMapping("/home")
    public String home() {
    	return "index";
    }
    
    @GetMapping("/customers")
    public String getCustomers() {
    	return "customerlist";
    }
    
    @GetMapping("/add_customer")
    public String getAddCustomer() {
    	return "customers";
    }
    
    @GetMapping("/mycustomers")
    public ModelAndView getAllCustomers() {
        ModelAndView modelAndView = new ModelAndView("customersList");
        return modelAndView;
    }
    
}
