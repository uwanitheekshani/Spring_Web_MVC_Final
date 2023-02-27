package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.RentalDTO;
import lk.ijse.spring.service.CarService;
import lk.ijse.spring.service.RentalService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/rental")
@CrossOrigin
public class CarRentalController {

    @Autowired
    RentalService service;

//    @GetMapping(path = "/generateRentalId", produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseUtil generateRentalId() {
//        return new ResponseUtil("200", "Ok", service.generateRentalId());
//    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveRental(@RequestBody RentalDTO dto){
        service.saveRental(dto);
        return new ResponseUtil("200",dto.toString()+ " Added",null);
    }


    @PutMapping(path = "/uploadImg/{rentalId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadImagesAndPath(@RequestPart("payment_slip") MultipartFile payment_slip, @PathVariable String rentalId) {
        try {

            String projectPath = String.valueOf(new File("E:\\imageSave\\uploads"));
            File uploadsDir = new File(projectPath + "\\paymentSlip");
            uploadsDir.mkdir();

            payment_slip.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + payment_slip.getOriginalFilename()));

            String rentalImageLocationPath = projectPath + "\\paymentSlip" + payment_slip.getOriginalFilename();

            service.uploadRentalImages(rentalImageLocationPath, rentalId);

            return new ResponseUtil("200", "Uploaded", null);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseUtil("500",e.getMessage(),null);
        }
    }
}
