package com.pms.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String stdNum;
    private String name;
    private int absent;
    private int sdf1;
    private int sdf2;
    private int tsi;
    private int dvm;
    private int ssi;
    private int ort;

}
