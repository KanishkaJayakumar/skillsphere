package com.example.skillsphere_backend.services;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import com.itextpdf.io.font.constants.StandardFonts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import com.itextpdf.layout.property.VerticalAlignment;

import java.io.ByteArrayOutputStream;

import com.example.skillsphere_backend.Repositories.CourseRepository;
import com.example.skillsphere_backend.Repositories.EnrollmentRepository;
import com.example.skillsphere_backend.Repositories.UserRepository;
import com.example.skillsphere_backend.entities.Certificate;
import com.example.skillsphere_backend.entities.CourseEntity;
import com.example.skillsphere_backend.entities.EnrollmentEntity;
import com.example.skillsphere_backend.entities.UserEntity;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public EnrollmentEntity enrollStudent(Long studentId, Long courseId) {
        UserEntity student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        CourseEntity course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        EnrollmentEntity enrollment = new EnrollmentEntity();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setProgress(0);
        enrollment.setCompleted(false);
        return enrollmentRepository.save(enrollment);
    }

    public List<EnrollmentEntity> getEnrollmentsByStudent(Long studentId) {
        UserEntity student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return enrollmentRepository.findByStudent(student);
    }

    // Get course details by enrollment
    public EnrollmentEntity getEnrollment(Long enrollmentId) {
        return enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
    }

    public EnrollmentEntity updateProgress(Long enrollmentId, float progress) {
        EnrollmentEntity enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        enrollment.setProgress(progress);
        if (progress >= 100)
            enrollment.setCompleted(true);
        return enrollmentRepository.save(enrollment);
    }

    // public ByteArrayResource createCertificatePDF(EnrollmentEntity enrollment) {
    // try {
    // ByteArrayOutputStream out = new ByteArrayOutputStream();
    // PdfWriter writer = new PdfWriter(out);
    // PdfDocument pdf = new PdfDocument(writer);
    // Document document = new Document(pdf);

    // document.add(new Paragraph("Certificate of Completion"));
    // document.add(new Paragraph("Student: " +
    // enrollment.getStudent().getUserName()));
    // document.add(new Paragraph("Course: " +
    // enrollment.getCourse().getCourseTitle()));

    // document.close();

    // return new ByteArrayResource(out.toByteArray());
    // } catch (Exception e) {
    // throw new RuntimeException("Error generating PDF", e);
    // }
    // }

public ByteArrayResource createCertificatePDF(EnrollmentEntity enrollment) {
    try {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf, PageSize.A4);
        document.setMargins(40, 40, 40, 40);

        // Fonts
        PdfFont bold = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
        PdfFont normal = PdfFontFactory.createFont(StandardFonts.HELVETICA);

        // Light blue background
        Rectangle rect = new Rectangle(PageSize.A4.getWidth(), PageSize.A4.getHeight());
        PdfCanvas canvas = new PdfCanvas(pdf.addNewPage());
        canvas.saveState()
              .setFillColor(new DeviceRgb(204, 229, 255)) // Light blue
              .rectangle(rect)
              .fill()
              .restoreState();

        // Logo + Brand Name in one row
        Table headerTable = new Table(new float[]{1, 4});
        headerTable.setWidth(UnitValue.createPercentValue(100));
        Image logo = new Image(ImageDataFactory.create("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvquTK6Pl3a2K-O4L0Oxl3JUKMREkBVUSOTg&s"))
                        .scaleToFit(50, 50);
        Paragraph brandName = new Paragraph("SKILLSPHERE")
                        .setFont(bold)
                        .setFontSize(24)
                        .setVerticalAlignment(VerticalAlignment.MIDDLE);

        headerTable.addCell(new Cell().add(logo).setBorder(Border.NO_BORDER));
        headerTable.addCell(new Cell().add(brandName).setBorder(Border.NO_BORDER));
        document.add(headerTable);

        document.add(new Paragraph("\n\n"));

        // Certificate title
        document.add(new Paragraph("Certificate of Completion")
                .setFont(bold)
                .setFontSize(32)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(20));

        // Student info
        document.add(new Paragraph("This certifies that")
                .setFont(normal)
                .setFontSize(16)
                .setTextAlignment(TextAlignment.CENTER));

        document.add(new Paragraph(enrollment.getStudent().getUserName())
                .setFont(bold)
                .setFontSize(20)
                .setTextAlignment(TextAlignment.CENTER));

        document.add(new Paragraph("has successfully completed the course")
                .setFont(normal)
                .setFontSize(16)
                .setTextAlignment(TextAlignment.CENTER));

        document.add(new Paragraph(enrollment.getCourse().getCourseTitle())
                .setFont(bold)
                .setFontSize(18)
                .setTextAlignment(TextAlignment.CENTER));

        document.add(new Paragraph("\n"));

        // Completion date
        document.add(new Paragraph("Date: " + java.time.LocalDate.now())
                .setFont(normal)
                .setFontSize(14)
                .setTextAlignment(TextAlignment.RIGHT));

        // Instructor signature
        document.add(new Paragraph("\n____________________")
                .setFont(normal)
                .setFontSize(14)
                .setTextAlignment(TextAlignment.RIGHT));

        document.add(new Paragraph(enrollment.getCourse().getInstructor().getUserName())
                .setFont(normal)
                .setFontSize(14)
                .setTextAlignment(TextAlignment.RIGHT));

        document.add(new Paragraph("Instructor Signature")
                .setFont(normal)
                .setFontSize(12)
                .setTextAlignment(TextAlignment.RIGHT));

        document.close();
        return new ByteArrayResource(out.toByteArray());

    } catch (Exception e) {
        throw new RuntimeException("Error generating certificate", e);
    }
}

    public ResponseEntity<ByteArrayResource> generateCertificate(Long enrollmentId) {
        EnrollmentEntity enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        if (!enrollment.isCompleted()) {
            throw new RuntimeException("Course not yet completed");
        }

        ByteArrayResource pdfResource = createCertificatePDF(enrollment);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"Certificate-" + enrollmentId + ".pdf\"")
                .body(pdfResource);
    }

}
