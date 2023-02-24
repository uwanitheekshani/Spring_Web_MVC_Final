package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CarService;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/addToCart")
@CrossOrigin
public class AddToCartController {

    @Autowired
    CarService service;

    @GetMapping
    public ResponseUtil getAllCars(){
        ArrayList<CarDTO> allCars = service.getAllCarDetail();
        return new ResponseUtil("200"," Success",allCars);
    }
}
