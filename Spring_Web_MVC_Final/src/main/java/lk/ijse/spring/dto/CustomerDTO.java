package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CustomerDTO {
    private String nic;
    private String cusName;
    private String contactNo;
    private String address;
    private LocalDate date;
    private String email;
    private String user_name;
    private String password;
    private String drivingLicenceNumber;
    private String imageLocation;

}
