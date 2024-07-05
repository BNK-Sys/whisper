package com.example.backend.service;


import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import java.io.FileNotFoundException;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public byte[] downloadFile(int memberId) throws FileNotFoundException {

        String fileName = memberId + "/스폰지밥.png";
        validateFileExists(fileName);

        S3Object object = amazonS3Client.getObject(bucket, fileName);
        S3ObjectInputStream objectContent = object.getObjectContent();

        try {
            byte[] byteArray = IOUtils.toByteArray(objectContent);
            return Base64.encodeBase64(byteArray);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void validateFileExists(String fileName) throws FileNotFoundException {
        if(!amazonS3Client.doesObjectExist(bucket, fileName))
            throw new FileNotFoundException();
    }
}
