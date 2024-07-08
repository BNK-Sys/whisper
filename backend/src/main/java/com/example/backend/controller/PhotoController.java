package com.example.backend.controller;

import com.example.backend.service.S3Service;
import java.io.FileNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class PhotoController {

    private final S3Service s3Service;

    @GetMapping("/photo/{memberId}")
    public byte[] getPhoto(@PathVariable("memberId") int memberId){
        try {
            byte[] bytes = s3Service.downloadFile(memberId);
            System.out.println(bytes);
            return bytes;
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
