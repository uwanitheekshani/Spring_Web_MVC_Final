package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.DriverDTO;
import lk.ijse.spring.entity.Driver;
import lk.ijse.spring.repo.DriverRepo;
import lk.ijse.spring.service.DriverService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    @Autowired
    DriverRepo repo;

    @Autowired
    ModelMapper mapper;


    @Override
    public DriverDTO checkDriverLogIn(String name, String password) {
        return null;
    }

    @Override
    public void saveDriver(DriverDTO driverDTO) {
//        if (repo.existsById(driverDTO.getDriver_id())){
//            throw new RuntimeException("Driver "+driverDTO.getDriver_id()+" Already Exist..!");
//        }
        Driver entity = mapper.map(driverDTO, Driver.class);
        repo.save(entity);
    }

    @Override
    public void updateDriver(DriverDTO driverDTO) {
        if (!repo.existsById(driverDTO.getDriverID())) {
            throw new RuntimeException("Driver " + driverDTO.getDriverID() + " Not Available to Update..!");
        }
        Driver entity = mapper.map(driverDTO, Driver.class);
        repo.save(entity);
    }

    @Override
    public void deleteDriver(String id) {

    }

    @Override
    public DriverDTO getDriverDetail(String id) {
        return null;
    }


    @Override
    public List<DriverDTO> getAllDriverDetail() {
        List<DriverDTO> list = new ArrayList<>();
        List<Driver> all = repo.findAll();
        for (Driver d : all) {
            list.add( new DriverDTO(d.getDriverID(),d.getName(),d.getNic(),d.getDrivingLicenceNum(),d.getAvailability()));
        }
        return list;
        // return mapper.map(repo.findAll(),new TypeToken<List<DriverDTO>>(){}.getType());
    }

    @Override
    public List<DriverDTO> getTodayAvailableAndOccupiedDrivers(String status) {
        return null;
    }

    @Override
    public DriverDTO searchDriverBydriverLicenceNum(String driverLicenceNum) {
        return mapper.map(repo.getDriverByDrivingLicenceNum(driverLicenceNum), DriverDTO.class);
    }

//    @Override
//    public DriverDTO getAllByAvailability() {
//        List<DriverDTO> list= new ArrayList<>();
//        Driver driver = repo.getAllByAvailability(availability);
//        for (Driver driver : allByAvailability) {
//            list.add(new DriverDTO(driver.getDriver_id()));
//        }
//        return driver;
//        return mapper.map( repo.getAllByAvailability(), DriverDTO.class);
//    }

    @Override
    public DriverDTO searchDriverByAvailabilty(String availability) {
        Driver d = repo.getDriverByAvailability(availability);
        return new DriverDTO(d.getDriverID(),d.getName(),d.getNic(),d.getDrivingLicenceNum(),d.getAvailability());
    }

    @Override
    public DriverDTO generateDriver() {
        return mapper.map(repo.findDriverRandomly(),DriverDTO.class);
    }

    @Override
    public void updateCarRentStatus(String driverID, String status) {
        if (repo.existsById(driverID)) {
            repo.updateDriverAvailabilityStatus(driverID, status);
        } else {
            throw new RuntimeException("Driver "+driverID+" Not Exist to Update Status....!");
        }
    }

//    @Override
//    public List<DriverDTO> getRandomDriver() {
//        return mapper.map(repo.findDriverRandomly(), new TypeToken<List<DriverDTO>>() {
//        }.getType());
//    }
//
//    @Override
//    public DriverDTO searchDriverBydriverId(String drivingId) {
//        return mapper.map( repo.getDriverByDriver_id(drivingId), DriverDTO.class);
//    }

}
