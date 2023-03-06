package lk.ijse.spring.controller;

import lk.ijse.spring.service.DriverService;
import lk.ijse.spring.service.PaymentService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
