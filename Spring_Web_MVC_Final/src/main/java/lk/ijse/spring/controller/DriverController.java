package lk.ijse.spring.controller;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.DriverDTO;
import lk.ijse.spring.service.AdminService;
import lk.ijse.spring.service.DriverService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/driver")
@CrossOrigin
public class DriverController {

    @Autowired
    DriverService service;


    @PostMapping
    public ResponseUtil saveDriver(@RequestBody DriverDTO dto){
        service.saveDriver(dto);
        return new ResponseUtil("200",dto.toString()+ " Added",null);
    }

    @GetMapping
    public ResponseUtil getAllDrivers(){
        List<DriverDTO> allDrivers = service.getAllDriverDetail();
        return new ResponseUtil("200"," Success",allDrivers);
    }

    @PutMapping
    public ResponseUtil updateDriver(@RequestBody DriverDTO dto){
        service.updateDriver(dto);
        return new ResponseUtil("200",dto.toString()+" Updated",null);
    }

    @GetMapping(params = "drivingLiNum")
    public ResponseUtil checkDriver(String drivingLiNum) {
        System.out.println(drivingLiNum);
        DriverDTO driverDTO = service.searchDriverBydriverLicenceNum(drivingLiNum);
//        System.out.println(adminDTO);
        return new ResponseUtil("200", "Login Success", driverDTO);
    }
}
