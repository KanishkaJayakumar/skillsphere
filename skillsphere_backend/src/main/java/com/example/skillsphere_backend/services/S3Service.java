package com.example.skillsphere_backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3Service {

    private final S3Client s3;

    @Value("${aws.bucket}")
    private String bucketName;

    @Value("${aws.region}")
    private String regionName;

    public S3Service(@Value("${aws.access.key}") String accessKey,
                     @Value("${aws.secret.key}") String secretKey,
                     @Value("${aws.region}") String regionName) {

        AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKey, secretKey);
        this.s3 = S3Client.builder()
                .region(Region.of(regionName)) // use region from properties
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .build();
    }

    public String uploadFile(MultipartFile file) {
        try {
            String key = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    // .acl("public-read") // make it public
                    .build();

            s3.putObject(request, software.amazon.awssdk.core.sync.RequestBody.fromBytes(file.getBytes()));

            return "https://" + bucketName + ".s3." + regionName + ".amazonaws.com/" + key;
        } catch (Exception e) {
            throw new RuntimeException("Error uploading file to S3", e);
        }
    }
}
