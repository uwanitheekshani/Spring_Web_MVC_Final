package lk.ijse.spring.dto;

import lk.ijse.spring.entity.RentDetails;
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
    private String driver_id;
    private String name;
    private String nic;
    private String drivingLicenceNum;
    private String availability;
    private List<RentDetails> rentalDetailsList;
}
