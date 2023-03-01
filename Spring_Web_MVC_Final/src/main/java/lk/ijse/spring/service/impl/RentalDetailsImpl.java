package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.dto.RentalDetailsDTO;
import lk.ijse.spring.repo.CarRepo;
import lk.ijse.spring.repo.RentalDetailsRepo;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.service.RentalDetails;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;

public class RentalDetailsImpl implements RentalDetails {

    @Autowired
    RentalDetailsRepo repo;

    @Autowired
    ModelMapper mapper;


    @Override
    public ArrayList<RentalDetailsDTO> getAllRentalDetail() {
        return mapper.map(repo.findAll(),new TypeToken<ArrayList<RentalDetailsDTO>>(){}.getType());
    }
}
