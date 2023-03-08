package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {
    @Autowired
    CustomerService service;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseUtil addVehicle(@RequestPart("cImageFile") MultipartFile[] file, @RequestPart("user") CustomerDTO customerDTO) {


        for (MultipartFile myFile : file) {

            try {
                String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
                File uploadsDir = new File(projectPath + "/uploads");
                uploadsDir.mkdir();
                myFile.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));
                System.out.println(projectPath);
            } catch (IOException | URISyntaxException e) {
                e.printStackTrace();
                return new ResponseUtil("500", "Registration Failed.Try Again Latter", null);
            }
        }




        service.saveCustomer(customerDTO);
        return new ResponseUtil("200", "Registration Successfully....", customerDTO);
    }


    @PostMapping(path = "/uploadImg/{nicNum}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadImagesAndPath(@RequestPart("imageLocation") MultipartFile imageLocation, @PathVariable String nicNum) {
        try {

            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            File uploadsDir = new File(projectPath + "/uploads");
            uploadsDir.mkdir();

            imageLocation.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + imageLocation.getOriginalFilename()));

            String customerImageLocationPath = imageLocation.getOriginalFilename();

            service.uploadCustomerImages(customerImageLocationPath, nicNum);

            return new ResponseUtil("200", "Uploaded", null);

        } catch (IOException | URISyntaxException e) {
            e.printStackTrace();
            return new ResponseUtil("500",e.getMessage(),null);
        }
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

    @PutMapping
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO dto){
        service.updateCustomer(dto);
        return new ResponseUtil("200",dto.toString()+" Updated",null);
    }


    @GetMapping(path = "/cusCount")
    public ResponseUtil getAllCustomerCount(){
        long count = service.count();
        return new ResponseUtil("200"," Success",count);
    }
//    @GetMapping(path = "/count", produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseUtil getAllCustomerCount() {
//        String s = service.getAllCustomerCount();
//        return new ResponseUtil("200", "Ok", s);
//    }


}
