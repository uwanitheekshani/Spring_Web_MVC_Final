package lk.ijse.spring.controller;

import lk.ijse.spring.dto.DriverDTO;
import lk.ijse.spring.dto.PaymentDTO;
import lk.ijse.spring.service.DriverService;
import lk.ijse.spring.service.PaymentService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {

    @Autowired
    PaymentService service;

    @GetMapping(path = "/generatePaymentId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generatePaymentId() {
        String s = service.generatePaymentId();
        return new ResponseUtil("200", "Ok", s);
    }


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil savePayment(@RequestBody PaymentDTO dto) {
        System.out.println(dto.toString());
        service.savePayment(dto);
        return new ResponseUtil("200","Payment Added Successfully "+dto.toString(),null);
    }

    @GetMapping(path = "/paymentCount")
    public ResponseUtil getAllPaymentCount(){
        long count = service.count();
        return new ResponseUtil("200"," Success",count);
    }
}
