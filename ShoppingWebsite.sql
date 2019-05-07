USE [master]
GO
/****** Object:  Database [ShoppingWebsite]    Script Date: 07-May-19 7:35:47 PM ******/
CREATE DATABASE [ShoppingWebsite]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ShoppingWebsite', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.SQLEXPRESS\MSSQL\DATA\ShoppingWebsite.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'ShoppingWebsite_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.SQLEXPRESS\MSSQL\DATA\ShoppingWebsite_log.ldf' , SIZE = 4096KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [ShoppingWebsite] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ShoppingWebsite].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ShoppingWebsite] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET ARITHABORT OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ShoppingWebsite] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ShoppingWebsite] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ShoppingWebsite] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ShoppingWebsite] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ShoppingWebsite] SET  MULTI_USER 
GO
ALTER DATABASE [ShoppingWebsite] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ShoppingWebsite] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ShoppingWebsite] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ShoppingWebsite] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [ShoppingWebsite] SET DELAYED_DURABILITY = DISABLED 
GO
USE [ShoppingWebsite]
GO
/****** Object:  Table [dbo].[ADMIN]    Script Date: 07-May-19 7:35:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ADMIN](
	[ID] [nchar](10) NOT NULL,
	[Ten] [nvarchar](50) NOT NULL,
	[MatKhau] [nvarchar](32) NOT NULL,
	[CongViec] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Table_1] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CHITIETDONHANG]    Script Date: 07-May-19 7:35:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CHITIETDONHANG](
	[IDDonHang] [nchar](10) NOT NULL,
	[IDSanPham] [nchar](10) NOT NULL,
	[SoLuong] [int] NOT NULL,
 CONSTRAINT [PK_CHITIETDONHANG] PRIMARY KEY CLUSTERED 
(
	[IDDonHang] ASC,
	[IDSanPham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DONHANG]    Script Date: 07-May-19 7:35:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DONHANG](
	[IDDonHang] [nchar](10) NOT NULL,
	[IDKhach] [nchar](10) NOT NULL,
	[Ngay] [date] NOT NULL,
	[TinhTrang] [nvarchar](50) NOT NULL,
	[DiaChi] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_DONHANG_1] PRIMARY KEY CLUSTERED 
(
	[IDDonHang] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[GIOHANG]    Script Date: 07-May-19 7:35:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GIOHANG](
	[IDKhach] [nchar](10) NOT NULL,
	[IDSanPham] [nchar](10) NOT NULL,
	[SoLuong] [int] NULL,
 CONSTRAINT [PK_GIOHANG_1] PRIMARY KEY CLUSTERED 
(
	[IDKhach] ASC,
	[IDSanPham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[KHACHHANG]    Script Date: 07-May-19 7:35:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[KHACHHANG](
	[ID] [nchar](10) NOT NULL,
	[Ten] [nvarchar](50) NOT NULL,
	[Matkhau] [nvarchar](32) NOT NULL,
	[Diachi] [nvarchar](50) NOT NULL,
	[Ngaysinh] [date] NOT NULL,
	[Gioitinh] [nvarchar](3) NOT NULL,
	[AnhDaidien] [binary](7000) NULL,
 CONSTRAINT [PK_Khach hang] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[LOAI]    Script Date: 07-May-19 7:35:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LOAI](
	[IDLoai] [nchar](5) NOT NULL,
	[Ten] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_LOAI_1] PRIMARY KEY CLUSTERED 
(
	[IDLoai] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SANPHAM]    Script Date: 07-May-19 7:35:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SANPHAM](
	[IDSanPham] [nchar](10) NOT NULL,
	[IDLoai] [nchar](5) NOT NULL,
	[TenSP] [nvarchar](50) NOT NULL,
	[Gia] [int] NOT NULL,
	[SL] [int] NOT NULL,
	[KichCo] [nvarchar](3) NULL,
	[Mau] [nvarchar](10) NOT NULL,
	[MoTa] [nvarchar](50) NULL,
	[HinhAnh] [binary](7000) NULL,
 CONSTRAINT [PK_SANPHAM_1] PRIMARY KEY CLUSTERED 
(
	[IDSanPham] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[ADMIN] ([ID], [Ten], [MatKhau], [CongViec]) VALUES (N'AD1       ', N'Minh', N'1234', N'Quản trị hệ thống')
INSERT [dbo].[ADMIN] ([ID], [Ten], [MatKhau], [CongViec]) VALUES (N'AD2       ', N'Nguyên', N'5678', N'Quản trị hệ thống')
INSERT [dbo].[ADMIN] ([ID], [Ten], [MatKhau], [CongViec]) VALUES (N'AD3       ', N'Nhi', N'1111', N'Quản trị hệ thống')
INSERT [dbo].[CHITIETDONHANG] ([IDDonHang], [IDSanPham], [SoLuong]) VALUES (N'DH001     ', N'SP001     ', 1)
INSERT [dbo].[CHITIETDONHANG] ([IDDonHang], [IDSanPham], [SoLuong]) VALUES (N'DH001     ', N'SP004     ', 1)
INSERT [dbo].[CHITIETDONHANG] ([IDDonHang], [IDSanPham], [SoLuong]) VALUES (N'DH002     ', N'SP002     ', 2)
INSERT [dbo].[CHITIETDONHANG] ([IDDonHang], [IDSanPham], [SoLuong]) VALUES (N'DH002     ', N'SP005     ', 2)
INSERT [dbo].[CHITIETDONHANG] ([IDDonHang], [IDSanPham], [SoLuong]) VALUES (N'DH003     ', N'SP003     ', 3)
INSERT [dbo].[DONHANG] ([IDDonHang], [IDKhach], [Ngay], [TinhTrang], [DiaChi]) VALUES (N'DH001     ', N'K001      ', CAST(N'2018-03-19' AS Date), N'Đã giao hàng', N'5 Tôn Đức Thắng')
INSERT [dbo].[DONHANG] ([IDDonHang], [IDKhach], [Ngay], [TinhTrang], [DiaChi]) VALUES (N'DH002     ', N'K002      ', CAST(N'2019-01-01' AS Date), N'Chưa giao hàng', N'18 Nguyễn Cảnh Chân')
INSERT [dbo].[DONHANG] ([IDDonHang], [IDKhach], [Ngay], [TinhTrang], [DiaChi]) VALUES (N'DH003     ', N'K003      ', CAST(N'2019-03-03' AS Date), N'Đã hủy', N'22 Nguyễn Văn Cừ')
INSERT [dbo].[GIOHANG] ([IDKhach], [IDSanPham], [SoLuong]) VALUES (N'K001      ', N'SP001     ', 2)
INSERT [dbo].[GIOHANG] ([IDKhach], [IDSanPham], [SoLuong]) VALUES (N'K001      ', N'SP002     ', 3)
INSERT [dbo].[GIOHANG] ([IDKhach], [IDSanPham], [SoLuong]) VALUES (N'K002      ', N'SP004     ', 1)
INSERT [dbo].[GIOHANG] ([IDKhach], [IDSanPham], [SoLuong]) VALUES (N'K003      ', N'SP005     ', 2)
INSERT [dbo].[GIOHANG] ([IDKhach], [IDSanPham], [SoLuong]) VALUES (N'K004      ', N'SP002     ', 1)
INSERT [dbo].[GIOHANG] ([IDKhach], [IDSanPham], [SoLuong]) VALUES (N'K005      ', N'Sp003     ', 1)
INSERT [dbo].[GIOHANG] ([IDKhach], [IDSanPham], [SoLuong]) VALUES (N'K005      ', N'Sp005     ', 2)
INSERT [dbo].[KHACHHANG] ([ID], [Ten], [Matkhau], [Diachi], [Ngaysinh], [Gioitinh], [AnhDaidien]) VALUES (N'K001      ', N'Xuyên', N'999293', N'123 Xô Viết Nghệ Tĩnh, Quận 3, TPHCM', CAST(N'1992-03-12' AS Date), N'Nữ', NULL)
INSERT [dbo].[KHACHHANG] ([ID], [Ten], [Matkhau], [Diachi], [Ngaysinh], [Gioitinh], [AnhDaidien]) VALUES (N'K002      ', N'Kiệt', N'475123', N'22 Cao Thắng, Quận 3, TP HCM', CAST(N'1988-04-24' AS Date), N'Nam', NULL)
INSERT [dbo].[KHACHHANG] ([ID], [Ten], [Matkhau], [Diachi], [Ngaysinh], [Gioitinh], [AnhDaidien]) VALUES (N'K003      ', N'Liên', N'111474', N'963 Nguyễn THị Minh Khai, Quận 3, TP HCM', CAST(N'1978-12-05' AS Date), N'Nữ', NULL)
INSERT [dbo].[KHACHHANG] ([ID], [Ten], [Matkhau], [Diachi], [Ngaysinh], [Gioitinh], [AnhDaidien]) VALUES (N'K004      ', N'Tuấn', N'333624', N'11 Phạm Thế Hiển, Quận 8, TP HCM', CAST(N'1993-05-03' AS Date), N'Nam', NULL)
INSERT [dbo].[KHACHHANG] ([ID], [Ten], [Matkhau], [Diachi], [Ngaysinh], [Gioitinh], [AnhDaidien]) VALUES (N'K005      ', N'Tiên', N'384666', N'4 Hoàng Diệu, Quận 4, TP HCM', CAST(N'2000-09-08' AS Date), N'Nữ', NULL)
INSERT [dbo].[LOAI] ([IDLoai], [Ten]) VALUES (N'L001 ', N'Áo')
INSERT [dbo].[LOAI] ([IDLoai], [Ten]) VALUES (N'L002 ', N'Quần')
INSERT [dbo].[LOAI] ([IDLoai], [Ten]) VALUES (N'L003 ', N'Giày')
INSERT [dbo].[LOAI] ([IDLoai], [Ten]) VALUES (N'L004 ', N'Balo')
INSERT [dbo].[LOAI] ([IDLoai], [Ten]) VALUES (N'L005 ', N'Phụ kiện')
INSERT [dbo].[SANPHAM] ([IDSanPham], [IDLoai], [TenSP], [Gia], [SL], [KichCo], [Mau], [MoTa], [HinhAnh]) VALUES (N'SP001     ', N'L001 ', N'Áo thun caro', 80000, 20, N'M', N'Trắng', N'Chất liệu: vải cotton, phù hợp khi mặc ở nhà', NULL)
INSERT [dbo].[SANPHAM] ([IDSanPham], [IDLoai], [TenSP], [Gia], [SL], [KichCo], [Mau], [MoTa], [HinhAnh]) VALUES (N'SP002     ', N'L002 ', N'Quần jean nữ', 200000, 60, N'M', N'Xanh', N'Phù hợp khi đi tiệc, gặp gỡ bạn bè', NULL)
INSERT [dbo].[SANPHAM] ([IDSanPham], [IDLoai], [TenSP], [Gia], [SL], [KichCo], [Mau], [MoTa], [HinhAnh]) VALUES (N'SP003     ', N'L003 ', N'Giày Sneaker Jordan', 1200000, 80, N'39', N'Đen', NULL, NULL)
INSERT [dbo].[SANPHAM] ([IDSanPham], [IDLoai], [TenSP], [Gia], [SL], [KichCo], [Mau], [MoTa], [HinhAnh]) VALUES (N'SP004     ', N'L004 ', N'Balo Seliux M5 Grant', 299000, 70, N'S', N'Xanh lá', N'Có nhiều ngăn, phù hợp khi đi du lịch', NULL)
INSERT [dbo].[SANPHAM] ([IDSanPham], [IDLoai], [TenSP], [Gia], [SL], [KichCo], [Mau], [MoTa], [HinhAnh]) VALUES (N'SP005     ', N'L005 ', N'Ví nữ', 100000, 40, NULL, N'Hồng', NULL, NULL)
ALTER TABLE [dbo].[CHITIETDONHANG]  WITH CHECK ADD  CONSTRAINT [FK_CHITIETDONHANG_DONHANG] FOREIGN KEY([IDDonHang])
REFERENCES [dbo].[DONHANG] ([IDDonHang])
GO
ALTER TABLE [dbo].[CHITIETDONHANG] CHECK CONSTRAINT [FK_CHITIETDONHANG_DONHANG]
GO
ALTER TABLE [dbo].[CHITIETDONHANG]  WITH CHECK ADD  CONSTRAINT [FK_CHITIETDONHANG_SANPHAM] FOREIGN KEY([IDSanPham])
REFERENCES [dbo].[SANPHAM] ([IDSanPham])
GO
ALTER TABLE [dbo].[CHITIETDONHANG] CHECK CONSTRAINT [FK_CHITIETDONHANG_SANPHAM]
GO
ALTER TABLE [dbo].[DONHANG]  WITH CHECK ADD  CONSTRAINT [FK_DONHANG_KHACHHANG] FOREIGN KEY([IDKhach])
REFERENCES [dbo].[KHACHHANG] ([ID])
GO
ALTER TABLE [dbo].[DONHANG] CHECK CONSTRAINT [FK_DONHANG_KHACHHANG]
GO
ALTER TABLE [dbo].[GIOHANG]  WITH CHECK ADD  CONSTRAINT [FK_GIOHANG_KHACHHANG] FOREIGN KEY([IDKhach])
REFERENCES [dbo].[KHACHHANG] ([ID])
GO
ALTER TABLE [dbo].[GIOHANG] CHECK CONSTRAINT [FK_GIOHANG_KHACHHANG]
GO
ALTER TABLE [dbo].[GIOHANG]  WITH CHECK ADD  CONSTRAINT [FK_GIOHANG_SANPHAM] FOREIGN KEY([IDSanPham])
REFERENCES [dbo].[SANPHAM] ([IDSanPham])
GO
ALTER TABLE [dbo].[GIOHANG] CHECK CONSTRAINT [FK_GIOHANG_SANPHAM]
GO
ALTER TABLE [dbo].[SANPHAM]  WITH CHECK ADD  CONSTRAINT [FK_SANPHAM_LOAI1] FOREIGN KEY([IDLoai])
REFERENCES [dbo].[LOAI] ([IDLoai])
GO
ALTER TABLE [dbo].[SANPHAM] CHECK CONSTRAINT [FK_SANPHAM_LOAI1]
GO
USE [master]
GO
ALTER DATABASE [ShoppingWebsite] SET  READ_WRITE 
GO
