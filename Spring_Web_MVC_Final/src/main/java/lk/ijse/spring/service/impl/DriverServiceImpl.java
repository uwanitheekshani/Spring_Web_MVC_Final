package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.DriverDTO;
import lk.ijse.spring.dto.RentalDTO;
import lk.ijse.spring.entity.Driver;
import lk.ijse.spring.repo.DriverRepo;
import lk.ijse.spring.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
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
    public String generateDriverId() {
        String lastId = repo.generateDriverId();
        String id = "";

        if (lastId != null) {
            int tempId = Integer.parseInt(lastId.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                id = "D00-000" + tempId;
            } else if (tempId <= 99) {
                id = "D00-00" + tempId;
            } else if (tempId <= 999) {
                id = "D00-0" + tempId;
            } else if (tempId <= 9999) {
                id = "D00-" + tempId;
            }
        } else {
            id = "D00-0001";
        }
        return id;
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
    }

    @Override
    public List<DriverDTO> getTodayAvailableAndOccupiedDrivers(String status) {
        return null;
    }

    @Override
    public DriverDTO searchDriverByLicence(String driverLicenceNum) {
        return mapper.map(repo.getDriverByDrivingLicenceNum(driverLicenceNum), DriverDTO.class);
    }

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
    public void updateDriverStatus(String driverID, String status) {
        if (repo.existsById(driverID)) {
            repo.updateDriverAvailabilityStatus(driverID, status);
        } else {
            throw new RuntimeException("Driver "+driverID+" Not Exist to Update Status....!");
        }
    }

    @Override
    public long count() {
        return repo.count();
    }

}
