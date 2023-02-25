package lk.ijse.spring.service.impl;

import lk.ijse.spring.repo.CarRepo;
import lk.ijse.spring.repo.RentalRepo;
import lk.ijse.spring.service.CarService;
import lk.ijse.spring.service.PaymentService;
import lk.ijse.spring.service.RentalService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class RentalServiceImpl implements RentalService {

    @Autowired
    RentalRepo repo;

    @Autowired
    ModelMapper mapper;


    @Override
    public String generateRentalId() {
        String lastId = repo.generateRentalId();
        String id = "";

        if (lastId != null) {
            int tempId = Integer.parseInt(lastId.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                id = "R00-000" + tempId;
            } else if (tempId <= 99) {
                id = "R00-00" + tempId;
            } else if (tempId <= 999) {
                id = "R00-0" + tempId;
            } else if (tempId <= 9999) {
                id = "R00-" + tempId;
            }
        } else {
            id = "R00-0001";
        }
        return id;
    }
}
