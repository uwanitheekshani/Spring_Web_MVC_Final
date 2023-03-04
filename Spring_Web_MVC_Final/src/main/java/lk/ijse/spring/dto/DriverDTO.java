package lk.ijse.spring.dto;

//import lk.ijse.spring.entity.RentDetails;
import lk.ijse.spring.entity.Rental;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class DriverDTO {
    private String driverID;
    private String name;
    private String nic;
    private String drivingLicenceNum;
    private String availability;
    private List<Rental> rentalList;

    public DriverDTO(String driverID) {
        this.driverID = driverID;
    }

    public DriverDTO(String driver_id, String name, String nic, String drivingLicenceNum, String availability) {
        this.driverID = driver_id;
        this.name = name;
        this.nic = nic;
        this.drivingLicenceNum = drivingLicenceNum;
        this.availability = availability;
    }
}
