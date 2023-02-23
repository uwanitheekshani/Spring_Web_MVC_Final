package lk.ijse.spring.controller;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.AdminService;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    @Autowired
    AdminService service;


    @PostMapping
    public ResponseUtil saveAdmin(@ModelAttribute AdminDTO dto){
        service.saveAdmin(dto);
        return new ResponseUtil("200",dto.toString()+ " Added",null);
    }
}
