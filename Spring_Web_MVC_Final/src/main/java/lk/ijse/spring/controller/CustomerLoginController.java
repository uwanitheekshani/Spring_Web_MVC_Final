package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customerLogin")
@CrossOrigin
public class CustomerLoginController {
    @Autowired
    CustomerService service;

    @GetMapping(params = "email")
    public ResponseUtil checkCustomer(String email) {
        System.out.println(email);
        CustomerDTO customerDTO = service.searchCustomerByEmail(email);
        System.out.println(customerDTO);
        return new ResponseUtil("200", "Login Success", customerDTO);
    }
}
