Name:           sism
Version:        0.7.0
Release:        1%{?dist}
Summary:        Services manager for GNU/Linux operating systems
Arch:           x86_64

License:        AGPLv3
URL:            https://github.com/luizgfranca/Sism
Source0:        https://github.com/luizgfranca/Sism

BuildRequires:  
Requires:       libsigc++
Requires:       pkgconf-pkg-config
Requires:       glib2
Requires:       pango
Requires:       cairo
Requires:       gdk-pixbuf2
Requires:       graphene
Requires:       gtk4
Requires:       glibmm2.68
Requires:       cairomm
Requires:       pangomm
Requires:       gtkmm4.0
Requires:       sdbus-cpp

%description
Services manager for GNU/Linux operating systems.

%prep
%autosetup


%build
%configure
%make_build


%install
rm -rf $RPM_BUILD_ROOT
mkdir -p $RPM_BUILD_ROOT/%{_bindir}
cp %{name}.sh $RPM_BUILD_ROOT/%{_bindir}

%make_install


%files




%changelog
* Thu Nov 09 2023 luizgfranca <luizgfc@proton.me>
- 
