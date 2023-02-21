package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {
    @Autowired
    CustomerService service;


    @PostMapping
    public ResponseUtil saveCustomer(@RequestBody CustomerDTO dto){
        service.saveCustomer(dto);
        return new ResponseUtil("200",dto.toString()+ " Added",null);
    }

    @GetMapping
    public ResponseUtil getAllCustomer(){
        List<CustomerDTO> allCustomers = service.getAllCustomerDetail();
        return new ResponseUtil("200"," Success",allCustomers);
    }

    @DeleteMapping(params = "nic")
    public ResponseUtil deleteCustomer(String nic){
        service.deleteCustomer(nic);
        return new ResponseUtil("200",nic+" Deleted",null);
    }

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCustomer(CustomerDTO dto){
        service.updateCustomer(dto);
        return new ResponseUtil("200",dto.toString()+" Updated",null);
    }

}
