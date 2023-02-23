package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {
    @Autowired
    CustomerService service;


    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveCustomer(@RequestBody CustomerDTO dto){
        service.saveCustomer(dto);
        return new ResponseUtil("200",dto.toString()+ " Added",null);
    }


    @PutMapping(path = "/uploadImg/{nicNum}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadImagesAndPath(@RequestPart("imageLocation") MultipartFile imageLocation, @PathVariable String nicNum) {
        try {

            String projectPath = String.valueOf(new File("E:\\imageSave\\uploads"));
            File uploadsDir = new File(projectPath + "\\customerImage");
            uploadsDir.mkdir();

            imageLocation.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + imageLocation.getOriginalFilename()));

            String customerImageLocationPath = projectPath + "\\customerImage" + imageLocation.getOriginalFilename();

            service.uploadCustomerImages(customerImageLocationPath, nicNum);

            return new ResponseUtil("200", "Uploaded", null);

        } catch (IOException e) {
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


}
