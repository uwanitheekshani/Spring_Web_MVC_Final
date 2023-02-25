package lk.ijse.spring.controller;

import lk.ijse.spring.service.CarService;
import lk.ijse.spring.service.RentalService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rental")
@CrossOrigin
public class CarRentalController {

    @Autowired
    RentalService service;

    @GetMapping(path = "/generateRentalId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generateRentalId() {
        return new ResponseUtil("200", "Ok", service.generateRentalId());
    }
}
