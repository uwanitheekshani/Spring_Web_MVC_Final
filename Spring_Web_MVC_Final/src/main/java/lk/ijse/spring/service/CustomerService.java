package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;

import java.util.ArrayList;
import java.util.List;
//@Component
public interface CustomerService {

    void saveCustomer(CustomerDTO customerDTO);

    void updateCustomer(CustomerDTO customerDTO);

    void deleteCustomer (String nic);

    CustomerDTO getCustomerDetail(String nic);

    ArrayList<CustomerDTO> getAllCustomerDetail();

    List<CustomerDTO> getTodayRegisteredCustomers();

    void uploadCustomerImages(String imageLocation, String nic);

    CustomerDTO searchCustomerByEmail(String email);

//    void getAllCustomerCount();

    long count();
}
