package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CarService;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/car")
@CrossOrigin
public class CarController {

    @Autowired
    CarService service;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveCar(@RequestBody CarDTO carDTO){
        service.saveCar(carDTO);
        return new ResponseUtil("200",carDTO.toString()+ " Added",null);
    }

    @PutMapping(path = "/uploadImg/{registrationNum}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadImagesAndPath(@RequestPart("image_1") MultipartFile image_1, @RequestPart("image_2") MultipartFile image_2, @RequestPart("image_3") MultipartFile image_3,@RequestPart("image_4") MultipartFile image_4, @PathVariable String registrationNum) {
        try {

            String projectPath = String.valueOf(new File("E:\\imageSave\\uploads"));
            File uploadsDir = new File(projectPath + "\\carImage");
            uploadsDir.mkdir();

            image_1.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image_1.getOriginalFilename()));
            image_2.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image_2.getOriginalFilename()));
            image_3.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image_3.getOriginalFilename()));
            image_4.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + image_4.getOriginalFilename()));

            String carFrontViewPath = projectPath + "\\carImage" + image_1.getOriginalFilename();
            String carBackViewPath = projectPath + "\\carImage" + image_2.getOriginalFilename();
            String carSideViewPath = projectPath + "\\carImage" + image_3.getOriginalFilename();
            String carInteriorViewPath = projectPath + "\\carImage" + image_4.getOriginalFilename();

            service.uploadCarImages(carFrontViewPath, carBackViewPath, carSideViewPath, carInteriorViewPath, registrationNum);

            return new ResponseUtil("200", "Uploaded", null);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseUtil("500",e.getMessage(),null);
        }
    }



}
