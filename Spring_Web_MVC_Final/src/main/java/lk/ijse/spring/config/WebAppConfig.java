package lk.ijse.spring.config;

import lk.ijse.spring.advicer.AppWideExceptionHandler;
//import lk.ijse.spring.controller.CustomerController;
import lk.ijse.spring.controller.CustomerController;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@ComponentScan(basePackageClasses = {AppWideExceptionHandler.class, CustomerController.class})
@EnableWebMvc
public class WebAppConfig {

}
