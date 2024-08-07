package com.sunbase.models;


import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Customer {
	@Id
    @Column(name = "uuid", updatable = false, nullable = false)
	private String uuid;
    @JsonProperty("first_name")
    @Column(name = "first_name")
    private String firstName;

    @JsonProperty("last_name")
    @Column(name = "last_name")
    private String lastName;
	private String street;
	private String address;
	private String city;
    @JsonProperty("state")
	private String state;
	private String email;
	private String phone;
	
	
}
