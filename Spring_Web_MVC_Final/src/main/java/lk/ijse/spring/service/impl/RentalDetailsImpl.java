//package lk.ijse.spring.service.impl;
//
////import lk.ijse.spring.dto.RentalDetailsDTO;
//import lk.ijse.spring.repo.RentalDetailsRepo;
//import lk.ijse.spring.service.RentalDetailsService;
//import org.modelmapper.ModelMapper;
//import org.modelmapper.TypeToken;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import javax.transaction.Transactional;
//import java.util.ArrayList;
//
//
//@Service
//@Transactional
//public class RentalDetailsImpl implements RentalDetailsService {
//
//    @Autowired
//    RentalDetailsRepo repo;
//
//    @Autowired
//    ModelMapper mapper;
//
//
//    @Override
//    public ArrayList<RentalDetailsDTO> getAllRentalDetail() {
//        return mapper.map(repo.findAll(),new TypeToken<ArrayList<RentalDetailsDTO>>(){}.getType());
//    }
//}
