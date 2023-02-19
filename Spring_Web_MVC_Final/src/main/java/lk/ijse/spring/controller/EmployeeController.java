package lk.ijse.spring.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employee")
@CrossOrigin
public class EmployeeController {
    @GetMapping
    public String get(){
        System.out.println("uwani");
        return "me";
    }
}
